import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

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
    private toasty: ToastyService
    ) {}

  pesquisar(pagina = 0) {
    this.executarPesquisa.emit(pagina);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Lançamento excluído com sucesso!')
      });
  }

}
