import ErrorMessage from '../enums/ErrorMessage';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { INewMatch, MatchResponse, NewMatch } from '../interfaces/Match';

export default class MatchService {
  static async getMatches(): Promise<MatchResponse[]> {
    const matches = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matches as MatchResponse[];
  }

  static async getMatchesByStatus(inProgress: boolean): Promise<MatchResponse[]> {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matches as MatchResponse[];
  }

  static async validateTeams(homeTeam: number, awayTeam: number): Promise<void> {
    if (homeTeam === awayTeam) {
      throw new Error(ErrorMessage.EQUAL_TEAMS);
    }

    const homeTeamExists = await Club.findOne({ where: { id: homeTeam } });
    const awayTeamExists = await Club.findOne({ where: { id: awayTeam } });
    if (!homeTeamExists || !awayTeamExists) {
      throw new Error(ErrorMessage.TEAM_NOT_FOUND);
    }
  }

  static async createMatch(newMatch: NewMatch): Promise<INewMatch> {
    const match = await Match.create(newMatch);
    return match as INewMatch;
  }
}
