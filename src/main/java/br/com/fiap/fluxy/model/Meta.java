package br.com.fiap.fluxy.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_meta")
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "meta_seq")
    @SequenceGenerator(name = "meta_seq", sequenceName = "seq_meta", allocationSize = 1)
    @Column(name = "id_meta")
    private Long id;

    @Column(name = "nm_meta", nullable = false, length = 100)
    private String nmMeta;

    @Column(name = "vl_objetivo", nullable = false)
    private Double vlObjetivo;

    @Column(name = "vl_acumulado")
    private Double vlAcumulado = 0.0;

    @Column(name = "dt_prazo")
    private LocalDate dtPrazo;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    public Meta() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNmMeta() {
        return nmMeta;
    }

    public void setNmMeta(String nmMeta) {
        this.nmMeta = nmMeta;
    }

    public Double getVlObjetivo() {
        return vlObjetivo;
    }

    public void setVlObjetivo(Double vlObjetivo) {
        this.vlObjetivo = vlObjetivo;
    }

    public Double getVlAcumulado() {
        return vlAcumulado;
    }

    public void setVlAcumulado(Double vlAcumulado) {
        this.vlAcumulado = vlAcumulado;
    }

    public LocalDate getDtPrazo() {
        return dtPrazo;
    }

    public void setDtPrazo(LocalDate dtPrazo) {
        this.dtPrazo = dtPrazo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}