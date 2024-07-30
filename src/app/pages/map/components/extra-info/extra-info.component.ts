import { Component, Input } from '@angular/core';
import { IPlaceDetails } from '../../../../shared/models/placeDetails.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-extra-info',
  standalone: true,
  imports: [TitleCasePipe],
  template: ` <p class="map__search-result__field">
    {{ transferData.field | titlecase }}: {{ transferData.value }}
  </p>`,
})
export class ExtraInfoComponent {
  @Input({ required: true }) transferData!: { field: string; value: string };
}
