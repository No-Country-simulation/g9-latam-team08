package team08.apirest.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import team08.apirest.models.UsuarioModel;
import team08.apirest.repositories.UsuarioRepository;

@Service
public class UsuarioService{
    @Autowired
    UsuarioRepository usuarioRepository;

    // URL Script de Python
    private final String PYTHON_SERVICE_URL = "http://localhost:5000/calcular-finanzas";

    // LISTA COMPLETA DE USUARIOS
    public ArrayList<UsuarioModel> obtenerUsuarios(){
        return (ArrayList<UsuarioModel>) usuarioRepository.findAll();
    }
    // AGREGAR UN NUEVO USUARIO
    public UsuarioModel guardarUsuario(UsuarioModel usuario){
        RestTemplate restTemplate = new RestTemplate();
        
        try {
            // ENVIO AL USUARIO 
            UsuarioModel usuarioCalculado = restTemplate.postForObject(PYTHON_SERVICE_URL, usuario, UsuarioModel.class);
            
            // SI ES EXITOSO, SE GUARDAN LOS DATOS
            if (usuarioCalculado != null) {
                return usuarioRepository.save(usuarioCalculado);
            }
        } catch (Exception e) {
            System.err.println("Error al comunicarse con el modelo de Python: " + e.getMessage());
        }
        
        // Plan de respaldo: Si Python falla, guarda el usuario tal cual llego para que la app no falle
        return usuarioRepository.save(usuario);
    }
    
    // ELIMINAR UN USUARIO POR ID
    public boolean eliminarUsuario(Long id){
        try{
            usuarioRepository.deleteById(id);
            return true;

        }catch(Exception err){
            return false;
        }

    }
    // BUSQUEDA DE UN USUARIO POR ID
    public Optional<UsuarioModel> obtenerPorID(Long id){
        return usuarioRepository.findById(id);
    }

    // BUSQUEDA DE USUARIOS POR PERFIL FINANCIERO
    public ArrayList<UsuarioModel> obtenerUsuariosPorPerfilFinanciero(String perfilFinanciero) {
        return usuarioRepository.findByPerfilFinanciero(perfilFinanciero);
    }

    // BUSQUEDA DE USUARIOS CON MESES DE SUPERVIVENCIA MAYORES O IGUALES A
    public ArrayList<UsuarioModel> obtenerUsuariosConSupervivenciaMayorACero() {
        return usuarioRepository.findByMesesSupervivenciaMayoresA(0);
    }
}

