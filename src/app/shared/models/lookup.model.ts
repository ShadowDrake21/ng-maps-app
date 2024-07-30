export interface ILookup {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: ILookupAddress;
  extratags: ILookupExtratags;
}

export interface ILookupAddress {
  tourism: string;
  road: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface ILookupExtratags {
  image: string;
  heritage: string;
  wikidata: string;
  architect: string;
  wikipedia: string;
  wheelchair: string;
  description: string;
  'heritage:website': string;
  'heritage:operator': string;
  'architect:wikidata': string;
  year_of_construction: string;
}
