import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { PessoaFiltro } from '../pessoa.service';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() totalRegistros = 0;
  @Input() filtro: PessoaFiltro;

  @Output() executarPesquisa = new EventEmitter();

  @ViewChild('tabela') grid;

  constructor(
    private confirmation: ConfirmationService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  private pesquisar(pagina = 0) {
    this.executarPesquisa.emit(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  private excluir(pessoa: any) {
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
    this.toasty.success(mensagem);
  }

}
