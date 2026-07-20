package team08.apirest.models;

// @Table(name="usuario") 
public class UsuarioModel{

    // Variables privadas
    private Long id;
    private String nombre;
    private String password;
    private String email;

    // GETTERS & SETTERS
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
    public String getPassword(){
        return password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}