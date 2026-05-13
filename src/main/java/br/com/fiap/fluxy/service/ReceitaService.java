package br.com.fiap.fluxy.service;

import br.com.fiap.fluxy.model.Receita;
import br.com.fiap.fluxy.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository repository;

    public List<Receita> listarTodas() {
        return repository.findAll();
    }

    public List<Receita> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Optional<Receita> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Receita salvar(Receita receita) {
        return repository.save(receita);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}