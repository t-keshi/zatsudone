import { Prefecture } from './constants/prefectures';

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
  address: string;
  placeId: string;
  prefecture: Prefecture | null;
  date: Date;
  openAt: Date;
  startAt: Date;
  closeAt: Date;
  symphonies: string[];
  orchestra: OrchestraSnippets;
}

export interface OrchestraSnippets {
  id: OrchestraResponse['id'];
  name: OrchestraResponse['name'];
}

// ---------- concerts ----------
export type ConcertType = {
  id: string;
  title: string;
  address: string;
  placeId: string;
  prefecture: Prefecture | null;
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
