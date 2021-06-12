export interface Location {
  _latitude: 10;
  _longitude: 120;
}

export interface TimeStamp {
  _seconds: 1621035000;
  _nanoseconds: 0;
}

// ---------- concert ----------
export interface ConcertResponse {
  id: string;
  title: string;
  location: Location;
  date: TimeStamp;
  openAt: TimeStamp;
  startAt: TimeStamp;
  closeAt: TimeStamp;
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
  program: string;
  location: string;
  date: Date;
  symphonies: string[];
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
