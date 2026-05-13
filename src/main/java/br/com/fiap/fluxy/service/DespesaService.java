package br.com.fiap.fluxy.service;

import br.com.fiap.fluxy.model.Despesa;
import br.com.fiap.fluxy.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository repository;

    public List<Despesa> listarTodas() {
        return repository.findAll();
    }

    public List<Despesa> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Optional<Despesa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Despesa salvar(Despesa despesa) {
        return repository.save(despesa);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}