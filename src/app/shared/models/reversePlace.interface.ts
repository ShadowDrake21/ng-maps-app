export interface IReversePlace {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
}

export interface LocalNames {
  [key: string]: string;
}
