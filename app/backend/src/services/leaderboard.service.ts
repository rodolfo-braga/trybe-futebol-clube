import CalculateHomeStats from '../utils/CalculateHomeStats';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { MatchsAtHome } from '../interfaces/Match';
import { LeaderboardRow } from '../interfaces/Leaderboard';

export default class LeaderboardService {
  static async getTeamsMatchsAtHome(): Promise<MatchsAtHome[]> {
    const teamsMatchsAtHome = await Club.findAll({
      include: [{
        model: Match,
        as: 'matchsAtHome',
        where: { inProgress: false },
      }],
    });
    return teamsMatchsAtHome as MatchsAtHome[];
  }

  static generateHomeLeaderboard(teamsMatchsAtHome: MatchsAtHome[]): LeaderboardRow[] {
    const leaderboard = teamsMatchsAtHome.map((team) => {
      const { clubName, matchsAtHome } = team;
      const teamStats = new CalculateHomeStats(matchsAtHome);
      return {
        name: clubName,
        totalPoints: teamStats.getTotalPoints(),
        totalGames: teamStats.getTotalGames(),
        totalVictories: teamStats.getTotalVictories(),
        totalDraws: teamStats.getTotalDraws(),
        totalLosses: teamStats.getTotalLosses(),
        goalsFavor: teamStats.getGoalsFavor(),
        goalsOwn: teamStats.getGoalsOwn(),
        goalsBalance: teamStats.getGoalsBalance(),
        efficiency: teamStats.getEfficiency(),
      };
    });
    return leaderboard;
  }

  static sortLeaderboard(leaderboard: LeaderboardRow[]): LeaderboardRow[] {
    return leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  }

  static async getHomeLeaderboard(): Promise<LeaderboardRow[]> {
    const teamsMatchsAtHome = await this.getTeamsMatchsAtHome();
    const leaderboard = this.generateHomeLeaderboard(teamsMatchsAtHome);
    return this.sortLeaderboard(leaderboard);
  }
}
