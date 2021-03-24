import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
