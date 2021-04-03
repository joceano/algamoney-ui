import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros = 0;
  @Input() filtro: LancamentoFiltro;

  @Output() executarPesquisa = new EventEmitter();

  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
    ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  private excluir(lancamento: any) {
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
    this.toasty.success(mensagem);
  }

}
