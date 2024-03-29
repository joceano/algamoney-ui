import { Lancamento } from './../../core/model';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: Lancamento[];
  @Input() totalRegistros: number;
  @Input() filtro: LancamentoFiltro;

  @Output() executarPesquisa = new EventEmitter();
  @ViewChild('tabela', {static: false}) public grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService
    ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows
    };
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: Lancamento) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  private excluir(lancamento: Lancamento) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.exclusaoSucesso();
        this.notificar('Lançamento excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private pesquisar(pagina = 0) {
    this.executarPesquisa.emit(pagina);
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
