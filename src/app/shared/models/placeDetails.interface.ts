export interface IPlaceDetails {
  place_id: number;
  parent_place_id: number;
  osm_type: string;
  osm_id: number;
  category: string;
  type: string;
  admin_level: string;
  localname: string;
  names: IPlaceDetailsNames;
  addresstags: IPlaceDetailsAddresstags;
  housenumber: any;
  calculated_postcode: string;
  country_code: string;
  indexed_date: string;
  importance: number;
  calculated_importance: number;
  extratags: IPlaceDetailsExtratags;
  calculated_wikipedia: string;
  rank_address: number;
  rank_search: number;
  isarea: boolean;
  centroid: IPlaceDetailsCentroid;
  geometry: IPlaceDetailsGeometry;
}

export interface IPlaceDetailsNames {
  name: string;
  'name:be': string;
  'name:de': string;
  'name:es': string;
  'name:he': string;
  'name:ko': string;
  'name:la': string;
  'name:ru': string;
  'name:uk': string;
  'name:zh': string;
}

export interface IPlaceDetailsAddresstags {
  postcode: string;
  city?: string;
  state?: string;
  street?: string;
}

export interface IPlaceDetailsExtratags {
  wikidata: string;
  wikipedia: string;
  flag?: string;
  website?: string;
  phone?: string;
  population?: string;
}

export interface IPlaceDetailsCentroid {
  type: string;
  coordinates: number[];
}

export interface IPlaceDetailsGeometry {
  type: string;
  coordinates: number[];
}
