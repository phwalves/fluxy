package br.com.fiap.fluxy.controller;

import br.com.fiap.fluxy.model.Meta;
import br.com.fiap.fluxy.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/metas")
@CrossOrigin(origins = "*")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @GetMapping("/usuario/{usuarioId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Meta> listarPorUsuario(@PathVariable Long usuarioId) {
        return metaService.listarPorUsuario(usuarioId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Meta criar(@RequestBody Meta meta) {
        return metaService.salvar(meta);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        metaService.deletar(id);
    }
}