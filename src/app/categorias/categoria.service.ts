import { Injectable } from '@angular/core';

import { MoneyHttp } from './../seguranca/money-http';
import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl).toPromise();
  }

}
