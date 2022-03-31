import Match from '../database/models/Match';

export interface MatchResponse extends Match {
  homeClub: { clubName: string };
  awayClub: { clubName: string };
}

export interface NewMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface INewMatch extends NewMatch {
  id: number;
}
