package br.com.fiap.fluxy.controller;

import br.com.fiap.fluxy.model.Despesa;
import br.com.fiap.fluxy.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")
@CrossOrigin(origins = "*")
public class DespesaController {

    @Autowired
    private DespesaService service;

    @GetMapping
    public List<Despesa> listar() {
        return service.listarTodas();
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Despesa> listarPorUsuario(@PathVariable Long usuarioId) {
        return service.listarPorUsuario(usuarioId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Despesa> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Despesa> criar(@RequestBody Despesa despesa) {
        Despesa novaDespesa = service.salvar(despesa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaDespesa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody Despesa despesa) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        despesa.setId(id);
        return ResponseEntity.ok(service.salvar(despesa));
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