import { Component, Input } from '@angular/core';
import { IPlaceDetails } from '../../../../shared/models/placeDetails.model';
import { NgFor, NgIf, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { trackById } from '../../utils/tracking.utils';
import { ExtraInfoComponent } from '../extra-info/extra-info.component';
import { NoAvailableInfoComponent } from '../no-available-info/no-available-info.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    UpperCasePipe,
    NgTemplateOutlet,
    ExtraInfoComponent,
    NoAvailableInfoComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input({ required: true, alias: 'foundPlacesDetails' })
  foundPlaces: IPlaceDetails[] = [];

  trackById = trackById;
}
