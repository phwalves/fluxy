drop table tb_despesa cascade constraints;
drop table tb_meta cascade constraints;
drop table tb_receita cascade constraints;
drop table tb_usuario cascade constraints;
drop sequence seq_despesa;
drop sequence seq_meta;
drop sequence seq_receita;

create sequence seq_despesa start with 1 increment by 1;
create sequence seq_meta start with 1 increment by 1;
create sequence seq_receita start with 1 increment by 1;

create table tb_usuario (
   id_usuario  number(5) primary key,
   nm_usuario  varchar2(100) not null,
   cpf         varchar2(11) not null unique,
   ds_email    varchar2(100) not null unique,
   ds_senha    varchar2(255) not null,
   dt_cadastro date default sysdate
);

create table tb_receita (
   id_receita number(5) primary key,
   id_usuario number(5) not null,
   ds_receita varchar2(100) not null,
   vl_receita number(10,2) not null,
   dt_receita date not null,
   constraint fk_receita_usuario foreign key ( id_usuario )
      references tb_usuario ( id_usuario )
);

create table tb_despesa (
   id_despesa number(5) primary key,
   id_usuario number(5) not null,
   ds_despesa varchar2(100) not null,
   vl_despesa number(10,2) not null,
   dt_despesa date not null,
   constraint fk_despesa_usuario foreign key ( id_usuario )
      references tb_usuario ( id_usuario )
);

create table tb_meta (
   id_meta      number(5) primary key,
   id_usuario   number(5) not null,
   nm_meta      varchar2(100) not null,
   vl_objetivo  number(10,2) not null,
   vl_acumulado number(10,2) default 0.00,
   dt_prazo     date,
   constraint fk_meta_usuario foreign key ( id_usuario )
      references tb_usuario ( id_usuario )
);

insert into tb_usuario (
   id_usuario,
   nm_usuario,
   cpf,
   ds_email,
   ds_senha,
   dt_cadastro
) values ( 1,
           'Usuário',
           '00000000000',
           'usuario@fluxy.com',
           'fluxy123',
           sysdate );

commit;