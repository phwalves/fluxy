package br.com.fiap.fluxy.repository;

import br.com.fiap.fluxy.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByUsuarioId(Long usuarioId);
}