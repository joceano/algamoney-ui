import { Pessoa } from './../../core/model';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PessoaFiltro } from '../pessoa.service';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() totalRegistros: number;
  @Input() filtro: PessoaFiltro;

  @Output() executarPesquisa = new EventEmitter();
  @ViewChild('tabela', {static: false}) public grid: Table;

  constructor(
    private confirmation: ConfirmationService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) {}

  alternarStatus(pessoa: Pessoa): void {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    if (event.first && event.rows){
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }

  private pesquisar(pagina = 0) {
    this.executarPesquisa.emit(pagina);
  }

  confirmarExclusao(pessoa: Pessoa) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  private excluir(pessoa: Pessoa) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.exclusaoSucesso();
        this.notificar('Pessoa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private exclusaoSucesso() {
    if (this.grid.first === 0) {
      this.pesquisar();
    } else {
      this.grid.first = 0;
    }
  }

  private notificar(mensagem: string) {
    this.messageService.add({ severity: 'success', detail: mensagem });
  }

}
