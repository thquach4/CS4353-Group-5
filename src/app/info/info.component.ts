import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoPageComponent {
  clientAddress: string;

  onAddressChange(event: any) {
    this.clientAddress = event.target.value;
  }
}
