export interface IPlaceCollection {
  type: string;
  licence: string;
  features: IPlace[];
}

export interface IPlace {
  type: string;
  properties: IPlaceProperties;
  bbox: number[];
  geometry: IPlaceGeometry;
}

export interface IPlaceProperties {
  place_id: string;
  osm_type: string;
  osm_id: string;
  display_name: string;
  place_rank: string;
  category: string;
  type: string;
  importance: number;
}

export interface IPlaceGeometry {
  type: string;
  coordinates: number[];
}
