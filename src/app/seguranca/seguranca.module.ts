import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }