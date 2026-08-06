package com.financeai.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer percentage; 

    @Column(nullable = false)
    private String icon;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaccion> transactions;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public Integer getPercentage() { return percentage; }
    public void setPercentage(Integer percentage) { this.percentage = percentage; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public List<Transaccion> getTransactions() { return transactions; }
    public void setTransactions(List<Transaccion> transactions) { this.transactions = transactions; }

    public enum CategoryName {
        VIVIENDA("Vivienda", "#1F77B4"),
        ALIMENTACION("Alimentación", "#2CA02C"),
        TRANSPORTE("Transporte", "#FF7F0E"),
        SERVICIOS("Servicios", "#D62728"),
        SALUD("Salud", "#9467BD"),
        ENTRETENIMIENTO("Entretenimiento", "#8C564B");

        private final String displayName;
        private final String color;

        CategoryName(String displayName, String color) {
            this.displayName = displayName;
            this.color = color;
        }

        public String getDisplayName() {
            return displayName;
        }

        public String getColor() {
            return color;
        }
    }
}
