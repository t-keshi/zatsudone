export interface Location {
  address: string;
  placeId: string;
}

export interface TimeStamp {
  _seconds: number;
  _nanoseconds: number;
}

// ---------- concert ----------
export interface ConcertResponse {
  id: string;
  title: string;
  programs: string;
  location: Location;
  date: string;
  openAt: string;
  startAt: string;
  closeAt: string;
  orchestra: OrchestraSnippets;
  participantsCount: number;
}

export interface OrchestraSnippets {
  id: OrchestraResponse['id'];
  name: OrchestraResponse['name'];
}

// ---------- concerts ----------
export type ConcertType = {
  id: string;
  title: string;
  location: Location;
  date: Date;
  symphonies: string[];
  orchestra: OrchestraSnippets;
};

export type ConcertsResponse = Record<'concerts', ConcertType[]>;

// ---------- orchestra ----------
export type OrchestraType = {
  id: string;
  name: string;
};

export type OrchestrasResponse = Record<'orchestras', OrchestraType[]>;

// ---------- orchestra ----------
export interface OrchestraResponse {
  id: string;
  name: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
}

// ---------- programs ----------
export interface Symphony {
  id: number;
  title: string;
  composer: string;
}

export interface Part {
  id: number;
  title: string;
  symphonies: Symphony[];
}

export type Program = Part[];
