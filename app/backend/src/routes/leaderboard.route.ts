import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import StatusCode from '../enums/StatusCode';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', async (_req, res) => {
  const homeLeaderboard = await LeaderboardController.getHomeLeaderboard();
  return res.status(StatusCode.OK).json(homeLeaderboard);
});

export default leaderboardRoute;
