package br.com.fiap.fluxy.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_despesa")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "despesa_seq")
    @SequenceGenerator(name = "despesa_seq", sequenceName = "seq_despesa", allocationSize = 1)
    @Column(name = "id_despesa")
    private Long id;

    @Column(name = "ds_despesa", nullable = false, length = 100)
    private String descricao;

    @Column(name = "vl_despesa", nullable = false)
    private Double valor;

    @Column(name = "dt_despesa", nullable = false)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    public Despesa() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}