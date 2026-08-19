# Informe — Clasificador de Categoría de Transacciones

## 1. Origen del enfoque

El diseño de este notebook está basado en el paper *"Hierarchical Classification of Financial
Transactions Through Context-Fusion of Transformer-based Embeddings"* (Busson et al.,
BTG Pactual / PUC-Rio, 2023), que propone el modelo **Two-headed DragoNet**.

La idea central del paper es: dado que una sola transacción rara vez tiene suficiente
información por sí sola, conviene generar una representación contextual (embedding) para
**cada texto disponible por separado** (en el paper: nombre del comercio + descripción de
actividad económica) y luego **fusionarlas** antes de clasificar. Nuestro notebook reproduce
esa misma idea, adaptada a un solo nivel de categoría (`categoria_principal`) en lugar del
esquema jerárquico macro/micro del paper original.

En una iteración anterior se probó también una variante reducida (sin `nombre_tienda`), a
modo de experimento de ablación. Tras comparar resultados, **se mantiene el modelo completo**
(`nombre_tienda` + `subcategoria` + `esencial`), que es el que se documenta en este informe.

## 2. Análisis Exploratorio de Datos (EDA)

El EDA se generó con [ydata-profiling](https://ydata.ai/?utm_source=opensource&utm_medium=pandasprofiling&utm_campaign=report)
sobre `dataset_gastos.csv` (2000 filas, 7 columnas, 0 valores nulos, 0 filas duplicadas). Resumen por
columna:

| Columna | Tipo | Distintos | Observación |
|---|---|---|---|
| `id_cliente` | Texto | 495 | Identificador; un mismo cliente aparece hasta ~11 veces. |
| `nombre_tienda` | Texto | 75 | Nombres de comercio recurrentes (ej. "transferencia", "centro", nombres propios). |
| `subcategoria` | Categórica | 22 | Bastante balanceada (5%–6% cada una aprox.). |
| `monto` | Numérica continua | 2000 (único por fila) | Media ≈ 60.410, rango 518–119.951, sin ceros ni negativos. |
| `metodo_pago` | Categórica | 5 | Balanceada (19%–21% cada valor). |
| `esencial` | Booleana | 2 | True 60.7% / False 39.4%. |
| `categoria_principal` (target) | Categórica | 6 | Balanceada (15.6%–18% por clase: Entretenimiento, Hogar, Finanzas, Transporte, Salud, Alimentacion). |

**Alertas relevantes del reporte** (correlación alta):
- `categoria_principal` está fuertemente correlacionada con `subcategoria` y con `esencial`.
- `subcategoria` está fuertemente correlacionada con `categoria_principal`.
- `monto` fue marcado como **"Unique"** (100% de valores distintos), es decir, se comporta
  como un identificador numérico más que como una señal categórica repetible.

**Qué se decidió a partir de esto**: `subcategoria` y `esencial` son las variables con mayor
poder predictivo directo sobre el target según el propio EDA, lo cual justifica que sean parte
del modelo. `monto` se descarta por ser prácticamente único por fila (no aporta un patrón
categórico repetible, y el reporte no lo señala correlacionado con el target). `metodo_pago`
tampoco aparece en las alertas de alta correlación con `categoria_principal`, por lo que se
descarta también. `id_cliente` se descarta por ser un identificador, no una característica de
la transacción.

## 3. Preprocesamiento aplicado

- No se manejan nulos ni duplicados explícitamente en el notebook porque el EDA confirmó
  0 valores nulos y 0 filas duplicadas en el dataset.
- `normalizar_esencial()`: convierte la columna `esencial` (valores como `TRUE`/`FALSE`,
  `si`/`no`, `1`/`0`) a `float32` 0/1, ya que la capa de red neuronal necesita un input numérico.
- `TextVectorization`: tokenización por índice (no TF-IDF) sobre `nombre_tienda` y
  `subcategoria` en conjunto, con vocabulario máximo de 5000 tokens y secuencias truncadas/
  rellenadas a 5 tokens. El vocabulario se ajusta (`adapt`) **solo con los datos de entrenamiento**
  para evitar fuga de información (data leakage) hacia el set de test.
- `LabelEncoder` sobre `categoria_principal` para mapear las 6 clases string a enteros.
- `train_test_split` 80/20 con `random_state=42` para reproducibilidad.

## 4. Ingeniería de características

No se construyeron variables derivadas nuevas a partir de las columnas originales del
dataset. La única transformación de tipo fue la de `esencial` (texto/booleano → numérico
0/1), que se trata como una feature aparte: se concatena directamente al vector de contexto
fusionado, sin pasar por el bloque Transformer (a diferencia de `nombre_tienda` y
`subcategoria`, que sí son texto y requieren tokenización + embeddings).

Se descartaron explícitamente del set de entrada: `id_cliente`, `monto` y `metodo_pago`, por
las razones detalladas en la sección de EDA.

## 5. Arquitectura y por qué se usaron estos algoritmos/capas

- **TextVectorization + Embedding**: convierte texto libre (`nombre_tienda`, `subcategoria`)
  en vectores entrenables. Es el mismo esquema de tokenización por índice que usa el paper
  para alimentar sus modelos de deep learning (lo distinguen de TF-IDF/HashingVectorizer,
  que reservan para los modelos clásicos).
- **Transformer Encoder (Multi-Head Attention)**: se eligió porque, en los experimentos del
  paper, el modelo Transformer superó consistentemente a LSTM, GRU, BLSTM y a los modelos
  clásicos (KNN, SVC, Random Forest) en las tres configuraciones probadas (solo nombre, solo
  descripción de actividad, y ambas combinadas).
- **Context-Fusion (concatenación + Dense)**: el paper muestra que fusionar los dos embeddings
  contextuales mejora el resultado frente a usar cualquiera de los dos textos por separado —
  el experimento combinado alcanzó ~93% F1 (macro) en el dataset de tarjetas y ~95% en el de
  cuentas, muy por encima de usar solo el nombre del comercio (~57-59% F1).
- **Por qué el nombre del comercio solo no basta**: el paper documenta que los embeddings del
  nombre del comercio muestran fuerte solapamiento entre clases (nombres genéricos o de
  persona sin semántica clara), de ahí la necesidad del segundo campo de contexto
  (en nuestro caso, `subcategoria`, que además el EDA confirma como altamente correlacionada
  con el target).
- **`esencial` como input numérico adicional**: no está en el paper original; se agregó porque
  el propio EDA la señala como altamente correlacionada con `categoria_principal`.
- **Softmax final por categoría**: clasificación multiclase estándar sobre `categoria_principal`,
  igual que las cabezas de salida del paper (softmax sobre las clases de la taxonomía).

## 6. Entrenamiento y métricas

- Optimizador Adam (`learning_rate=0.001`), función de pérdida
  `sparse_categorical_crossentropy`, 10 épocas, `batch_size=32`.
- El notebook reporta dos niveles de métrica sobre el set de test:
  - **Accuracy de validación** (última época).
  - **Precision / Recall / F1-score por clase**, vía `classification_report` de scikit-learn,
    para detectar si alguna de las 6 categorías rinde peor que el resto (algo que el accuracy
    global no muestra).
- Como el target está razonablemente balanceado (15.6%–18% por clase según el EDA), el
  accuracy es una métrica global razonable, pero el detalle por clase sigue siendo la forma
  correcta de confirmar que ninguna categoría queda sub-representada en el desempeño del
  modelo.

**Resultado obtenido (set de test, 400 filas):**

```
Precision / Recall / F1-score por clase (sobre el set de test):

                  precision    recall  f1-score   support

    Alimentacion      1.000     1.000     1.000        65
 Entretenimiento      1.000     1.000     1.000        72
        Finanzas      1.000     1.000     1.000        64
           Hogar      1.000     1.000     1.000        64
           Salud      1.000     1.000     1.000        73
      Transporte      1.000     1.000     1.000        62

        accuracy                          1.000       400
       macro avg      1.000     1.000     1.000       400
    weighted avg      1.000     1.000     1.000       400
```

El modelo alcanzó 100% en precision/recall/F1 en las 6 clases. Esto es consistente con lo
detectado en el EDA: `subcategoria` está fuertemente (casi determinísticamente) correlacionada
con `categoria_principal` — cada `subcategoria` pertenece en la práctica a una única
`categoria_principal` — por lo que un modelo que recibe `subcategoria` como input tiene toda la
información necesaria para clasificar sin ambigüedad. No es un indicio de fuga de datos entre
train/test (el split se hizo antes de ajustar el vectorizador y antes de entrenar), sino una
consecuencia esperable de la relación 1 a 1 entre `subcategoria` y `categoria_principal` en este
dataset.

## 7. Formato de serialización y versiones de librerías

- **Modelo** → `modelo_categoria_full.keras`: formato nativo de Keras, guarda arquitectura,
  pesos entrenados y configuración de compilación. Se usa `model.save(...)` porque es el
  único método que reconstruye de forma confiable un modelo de TensorFlow/Keras (grafo de
  operaciones, variables, optimizador), algo que `pickle` no garantiza para este tipo de objeto.
- **Artefactos** → `artefactos_categoria.pkl`: contiene objetos que no son de Keras y por
  eso se serializan con `pickle`:
  - `label_encoder` (objeto `sklearn.LabelEncoder`).
  - `config_vectorizador['vocabulario']` (lista de tokens del `TextVectorization`).
  - `versiones_librerias`: diccionario con las versiones de Python, TensorFlow, Keras,
    scikit-learn, NumPy y Pandas usadas al momento de entrenar y guardar. Esto es clave para
    poder diagnosticar problemas de compatibilidad si el modelo se carga después en un
    entorno con versiones distintas (un `.keras` guardado con una versión de TF/Keras puede
    fallar al cargarse con otra).

**Versiones registradas en este entrenamiento:**

```
python: 3.12.13
tensorflow: 2.20.0
keras: 3.13.2
scikit-learn: 1.6.1
numpy: 2.0.2
pandas: 2.2.2
```

## 8. Referencias

- Busson, A. J. G. et al. (2023). *Hierarchical Classification of Financial Transactions Through
  Context-Fusion of Transformer-based Embeddings and Taxonomy-aware Attention Layer*.
  arXiv:2312.07730.
- ydata-profiling — herramienta usada para el EDA: https://ydata.ai
