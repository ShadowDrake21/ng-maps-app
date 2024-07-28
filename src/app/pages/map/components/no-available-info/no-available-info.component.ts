import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-available-info',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <p class="map__search-result__field">
      {{ infoMessage | titlecase }}: no available info
    </p>
  `,
})
export class NoAvailableInfoComponent {
  @Input() infoMessage: string = '';
}
