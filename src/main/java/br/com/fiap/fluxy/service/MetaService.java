package br.com.fiap.fluxy.service;

import br.com.fiap.fluxy.model.Meta;
import br.com.fiap.fluxy.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MetaService {

    @Autowired
    private MetaRepository metaRepository;

    public List<Meta> listarPorUsuario(Long usuarioId) {
        return metaRepository.findByUsuarioId(usuarioId);
    }

    public Meta salvar(Meta meta) {
        if (meta.getVlAcumulado() == null) {
            meta.setVlAcumulado(0.0);
        }
        return metaRepository.save(meta);
    }

    public void deletar(Long id) {
        metaRepository.deleteById(id);
    }
}