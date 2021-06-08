import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    this.carregarEstados();
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  private carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
                this.pessoa.endereco.cidade.estado.codigo : 0;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  novo(form: NgForm) {
    form.reset();
    this.router.navigate(['/pessoas/nova']);
  }

  private atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
