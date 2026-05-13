package br.com.fiap.fluxy.controller;

import br.com.fiap.fluxy.model.Receita;
import br.com.fiap.fluxy.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@CrossOrigin(origins = "*")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    public List<Receita> listar() {
        return service.listarTodas();
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Receita> listarPorUsuario(@PathVariable Long usuarioId) {
        return service.listarPorUsuario(usuarioId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Receita> criar(@RequestBody Receita receita) {
        Receita novaReceita = service.salvar(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReceita);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        receita.setId(id);
        return ResponseEntity.ok(service.salvar(receita));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}