import { Router } from 'express';
import tokenValidation from '../middlewares/token.validation';
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

matchsRoute.post(
  '/',
  tokenValidation,
  async (req, res, next) => {
    try {
      const newMatch = await MatchController.createMatch(req.body);
      return res.status(StatusCode.CREATED).json(newMatch);
    } catch (error) {
      next(error);
    }
  },
);

matchsRoute.patch('/:id/finish', async (req, res, next) => {
  try {
    const { id } = req.params;
    await MatchController.finishMatch(Number(id));
    return res.status(StatusCode.OK).json({ message: 'Match finished' });
  } catch (error) {
    next(error);
  }
});

matchsRoute.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchController.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(StatusCode.OK).json({ message: 'Match updated' });
  } catch (error) {
    next(error);
  }
});

export default matchsRoute;
