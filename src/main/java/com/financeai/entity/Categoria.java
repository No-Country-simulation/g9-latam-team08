package com.financeai.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_padre_id")
    private Categoria categoriaPadre;

    @OneToMany(mappedBy = "categoriaPadre", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Categoria> subcategorias;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaccion> transacciones;

    // Campos auxiliares para visualización (no obligatorios en BD)
    @Column(name = "color")
    private String color;

    @Column(name = "icon")
    private String icon;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Categoria getCategoriaPadre() { return categoriaPadre; }
    public void setCategoriaPadre(Categoria categoriaPadre) { this.categoriaPadre = categoriaPadre; }
    public List<Categoria> getSubcategorias() { return subcategorias; }
    public void setSubcategorias(List<Categoria> subcategorias) { this.subcategorias = subcategorias; }
    public List<Transaccion> getTransacciones() { return transacciones; }
    public void setTransacciones(List<Transaccion> transacciones) { this.transacciones = transacciones; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    // Aliases de compatibilidad para servicios existentes
    public String getName() { return nombre; }
    public void setName(String name) { this.nombre = name; }
    public Integer getPercentage() { return 0; }
    public void setPercentage(Integer percentage) { /* no-op, campo eliminado */ }
    public List<Transaccion> getTransactions() { return transacciones; }
    public void setTransactions(List<Transaccion> transactions) { this.transacciones = transactions; }

    public enum CategoriaPrincipal {
        ALIMENTACION("Alimentación", "#2CA02C"),
        TRANSPORTE("Transporte", "#FF7F0E"),
        SALUD("Salud", "#9467BD"),
        VIVIENDA("Vivienda", "#1F77B4"),
        EDUCACION("Educación", "#17BECF"),
        OCIO("Ocio", "#8C564B"),
        SERVICIOS("Servicios", "#D62728"),
        OTRAS("Otras", "#7F7F7F"),
        INGRESOS("Ingresos", "#4CAF50");

        private final String displayName;
        private final String color;

        CategoriaPrincipal(String displayName, String color) {
            this.displayName = displayName;
            this.color = color;
        }

        public String getDisplayName() { return displayName; }
        public String getColor() { return color; }
    }
}
