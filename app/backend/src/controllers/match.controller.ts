import MatchService from '../services/match.service';
import { INewMatch, MatchResponse, NewMatch } from '../interfaces/Match';

export default class MatchController {
  static async getMatches(): Promise<MatchResponse[]> {
    const matches = await MatchService.getMatches();
    return matches;
  }

  static async getMatchByStatus(inProgress: boolean): Promise<MatchResponse[]> {
    const matches = await MatchService.getMatchesByStatus(inProgress);
    return matches;
  }

  static async createMatch(newMatch: NewMatch): Promise<INewMatch> {
    await MatchService.validateTeams(newMatch.homeTeam, newMatch.awayTeam);
    const match = await MatchService.createMatch(newMatch);
    return match;
  }

  static async finishMatch(id: number): Promise<void> {
    await MatchService.finishMatch(id);
  }

  static async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await MatchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
  }
}
