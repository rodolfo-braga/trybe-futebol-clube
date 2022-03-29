import Match from '../database/models/Match';

export interface MatchResponse extends Match {
  homeClub: { clubName: string };
  awayClub: { clubName: string };
}
