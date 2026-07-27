# Informe — Clasificador de Categoría de Transacciones

## 1. Origen del enfoque

El diseño de este notebook está basado en el paper *"Hierarchical Classification of Financial
Transactions Through Context-Fusion of Transformer-based Embeddings"* (Busson et al.,
BTG Pactual / PUC-Rio, 2023), que propone el modelo **Two-headed DragoNet**

La idea central del paper es: dado que una sola transacción rara vez tiene suficiente
información por sí sola, conviene generar una representación contextual (embedding) para
**cada texto disponible por separado** (en el paper: nombre del comercio + descripción de
actividad económica) y luego **fusionarlas** antes de clasificar. Nuestro notebook reproduce
esa misma idea, adaptada a un solo nivel de categoría (`categoria_principal`) en lugar del
esquema jerárquico macro/micro del paper original

## 2. Por qué se usaron estos algoritmos/capas

- **TextVectorization + Embedding**: convierte texto libre (`nombre_tienda`, `subcategoria`)
  en vectores entrenables. Es el mismo esquema de tokenización por índice que usa el paper
  para alimentar sus modelos de deep learning (lo distinguen de TF-IDF/HashingVectorizer,
  que reservan para los modelos clásicos)
- **Transformer Encoder (Multi-Head Attention)**: se eligió porque, en los experimentos del
  paper, el modelo Transformer superó consistentemente a LSTM, GRU, BLSTM y a los modelos
  clásicos (KNN, SVC, Random Forest) en las tres configuraciones probadas (solo nombre, solo
  descripción de actividad, y ambas combinadas)
- **Context-Fusion (concatenación + Dense)**: el paper muestra que fusionar los dos embeddings
  contextuales mejora el resultado frente a usar cualquiera de los dos textos por separado —
  el experimento combinado alcanzó ~93% F1 (macro) en el dataset de tarjetas y ~95% en el de
  cuentas, muy por encima de usar solo el nombre del comercio (~57-59% F1)
- **Por qué el nombre del comercio solo no basta**: el paper documenta que los embeddings del
  nombre del comercio muestran fuerte solapamiento entre clases (nombres genéricos o de
  persona sin semántica clara), de ahí la necesidad del segundo campo de contexto
  (en nuestro caso, `subcategoria`)
- **`esencial` como input numérico adicional**: no está en el paper original; se agregó como
  feature extra porque aporta una señal simple (gasto esencial o no) que no depende de texto,
  por eso se concatena directamente al vector de fusión en vez de pasar por el Transformer
- **Softmax final por categoría**: clasificación multiclase estándar sobre `categoria_principal`,
  igual que las cabezas de salida del paper (softmax sobre las clases de la taxonomía)

En el notebook actual se entrenan y comparan dos variantes:
- **Modelo A (completo)**: `nombre_tienda` + `subcategoria` + `esencial`
- **Modelo B (reducido)**: solo `subcategoria` + `esencial` (sin nombre del comercio)

Esto replica, en miniatura, el mismo experimento de ablación que hace el paper (comparar qué
pasa con y sin cada input) para decidir si el nombre del comercio realmente aporta valor en
tu dataset

## 3. Cómo Entrenar y usar el Modelo

1. **Subir el dataset** `dataset.csv` a `/content/drive/MyDrive/` (o la ruta donde tengas el notebook de entrenamiento)
2. **Ejecutar `modeloClasificatorio.ipynb`** de arriba hacia abajo:
   - Monta Drive y carga librerías
   - Carga el CSV y normaliza `esencial` (TRUE/FALSE → 1/0)
   - Vectoriza `nombre_tienda` + `subcategoria`
   - Entrena el Modelo A y el Modelo B
   - Imprime el `val_accuracy` de ambos para comparar si conviene o no usar `nombre_tienda`
   - Guarda `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras` y
     `artefactos_categoria.pkl` (label encoder + vocabulario)
3. **Copiar los 3 archivos generados** a `/content/drive/MyDrive/` (o la ruta que uses)
4. **Ejecutar `pruebas_modeloClasificatorio.ipynb`**:
   - Carga ambos modelos y los artefactos
   - Usa `predecir_transaccion_full(nombre_tienda, subcategoria, esencial)` o
     `predecir_transaccion_reducido(subcategoria, esencial)` según qué variante de modelo quieras
     probar
   - Cada función devuelve `categoria_principal` predicha y su confianza

## 4. Referencia

Busson, A. J. G. et al. (2023). *Hierarchical Classification of Financial Transactions Through
Context-Fusion of Transformer-based Embeddings and Taxonomy-aware Attention Layer*.
arXiv:2312.07730.
