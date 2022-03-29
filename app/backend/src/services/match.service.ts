import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { MatchResponse } from '../interfaces/Match';

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
}
