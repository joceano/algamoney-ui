import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageModule } from 'primeng/message';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    MessageModule
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent,
    MessageModule
  ]
})
export class SharedModule { }
