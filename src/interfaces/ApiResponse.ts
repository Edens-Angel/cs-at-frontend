export interface Language {
  name: string;
}
export interface Country {
  name: string;
  languages: Language[];
}
export interface Continent {
  name: string;
  countries: Country[];
}

export interface ApiResponse {
  continents: Continent[];
}
