import { IPlaceDetails } from '../../../shared/models/placeDetails.model';

export const trackById = (
  index: number,
  placeDetail: IPlaceDetails
): number => {
  return placeDetail.place_id;
};
