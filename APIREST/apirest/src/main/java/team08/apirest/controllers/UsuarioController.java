package team08.apirest.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team08.apirest.models.UsuarioModel;
import team08.apirest.services.UsuarioService;


@RestController
@RequestMapping("/api/usuarios") // Ruta base para los endpoints de usuarios
public class UsuarioController{
    @Autowired
    UsuarioService usuarioService;

    @GetMapping()
    public ArrayList<UsuarioModel> obtenerUsuarios(){
        return usuarioService.obtenerUsuarios();
    }

    @PostMapping()
    public UsuarioModel guardarUsuario(@RequestBody UsuarioModel usuario){
        return this.usuarioService.guardarUsuario(usuario);
    }

    @GetMapping( path = "/{id}")
    public Optional<UsuarioModel> obtenerUsuarioporID(@PathVariable("id") Long id){
        return this.usuarioService.obtenerPorID(id);
    }

    @DeleteMapping( path = "/{id}")
    public String eliminarPorID(@PathVariable("id") Long id){
        boolean eliminado = this.usuarioService.eliminarUsuario(id);
        if (eliminado){
            return "Se elimino al usuario de id: " + id;
        } else{
            return "No se pudo eliminar al usuario de id: " + id;
        }
    }
    @GetMapping("/{perfilFinanciero}")
    public ArrayList<UsuarioModel> obtenerUsuariosPorPerfil(@PathVariable("perfilFinanciero") String perfilFinanciero) {
        return this.usuarioService.obtenerUsuariosPorPerfilFinanciero(perfilFinanciero);
    }

    @GetMapping("/{meses_supervivencia}")
    public ArrayList<UsuarioModel> obtenerUsuariosConSupervivenciaMayorACero() {
        return this.usuarioService.obtenerUsuariosConSupervivenciaMayorACero();
    }

    @PostMapping("/analisis")
    public UsuarioModel obtenerAnalisis(@RequestBody UsuarioModel usuario) {
        return this.usuarioService.generarAnalisisFinanciero(usuario);
    }
}
