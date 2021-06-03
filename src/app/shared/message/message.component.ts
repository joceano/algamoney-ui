import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <small *ngIf="temErro()" id="username-help" class="p-error">{{ text }}</small>
  `,
  styles: [`
    .p-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: any;
  @Input() text: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
