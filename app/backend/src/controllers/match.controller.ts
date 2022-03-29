import MatchService from '../services/match.service';
import { MatchResponse } from '../interfaces/Match';

export default class MatchController {
  static async getMatches(): Promise<MatchResponse[]> {
    const matches = await MatchService.getMatches();
    return matches;
  }

  static async getMatchByStatus(inProgress: boolean): Promise<MatchResponse[]> {
    const matches = await MatchService.getMatchesByStatus(inProgress);
    return matches;
  }
}
