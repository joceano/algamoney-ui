import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() totalRegistros = 0;
  @Input() filtro: PessoaFiltro;

  @Output() pesquisar = new EventEmitter();

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar.emit(pagina);
  }

}
