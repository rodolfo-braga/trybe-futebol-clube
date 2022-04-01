import LeaderboardService from '../services/leaderboard.service';
import { LeaderboardRow } from '../interfaces/Leaderboard';

export default class LeaderboardController {
  static async getHomeLeaderboard(): Promise<LeaderboardRow[]> {
    const leaderboard = await LeaderboardService.getHomeLeaderboard();
    return leaderboard;
  }
}
