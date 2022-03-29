import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import StatusCode from '../enums/StatusCode';

const matchsRoute = Router();

matchsRoute.get('/', async (req, res) => {
  const { inProgress } = req.query as { inProgress: string };
  let matches;
  if (inProgress === undefined) {
    matches = await MatchController.getMatches();
  } else {
    const status = inProgress === 'true';
    matches = await MatchController.getMatchByStatus(status);
  }
  return res.status(StatusCode.OK).json(matches);
});

export default matchsRoute;
