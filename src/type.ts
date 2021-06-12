import { Prefecture } from './constants/prefectures';

export interface Concert {
  id: number;
  title: string;
  orchestra: Orchestra;
  program: Part[];
  prefecture: Prefecture;
  location: string;
  date: Date;
  openAt: string;
  startAt: string;
  closeAt: string;
}

export interface Orchestra {
  id: number;
  name: string;
  // orchestraDetail: string;
}

export interface OrchestraDetail extends Orchestra {
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
}

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
