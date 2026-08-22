package team08.apirest.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class GastoModel {
    // VARIABLES
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gasto")
    private Long idGasto;

    @Column(name = "nombre_tienda")
    private String nombreTienda;

    @Column(name = "subcategoria")
    private String subcategoria;

    @Column(name = "monto")
    private Double monto;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @Column(name = "esencial")
    private Boolean esencial;

    @Column(name = "categoria_principal")
    private String categoriaPrincipal;

    //RELACION CON USUARIO
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false) // FK
    private UsuarioModel usuario;

    // CONSTRUCTOR
    public GastoModel() {}

    // ==========================================
    // GETTERS Y SETTERS
    // ==========================================

    public Long getIdGasto() {
        return idGasto; 
    }
    public void setIdGasto(Long idGasto){ 
        this.idGasto = idGasto; 
    }

    public String getNombreTienda() {
        return nombreTienda; 
    }
    public void setNombreTienda(String nombreTienda) {
        this.nombreTienda = nombreTienda;
    }

    public String getSubcategoria() { 
        return subcategoria; 
    }
    public void setSubcategoria(String subcategoria) { 
        this.subcategoria = subcategoria; 
    }

    public Double getMonto() {
        return monto; 
    }
    public void setMonto(Double monto) { 
        this.monto = monto; 
    }

    public String getMetodoPago() { 
        return metodoPago; 
    }
    public void setMetodoPago(String metodoPago) { 
        this.metodoPago = metodoPago; 
    }

    public Boolean getEsencial() { 
        return esencial; 
    }
    public void setEsencial(Boolean esencial) { 
        this.esencial = esencial; 
    }

    public String getCategoriaPrincipal() { 
        return categoriaPrincipal; 
    }
    public void setCategoriaPrincipal(String categoriaPrincipal) { 
        this.categoriaPrincipal = categoriaPrincipal; 
    }

    public UsuarioModel getUsuario() { 
        return usuario; 
    }
    public void setUsuario(UsuarioModel usuario) { 
        this.usuario = usuario; 
    }
}
