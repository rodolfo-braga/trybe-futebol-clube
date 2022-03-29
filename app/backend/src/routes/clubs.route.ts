import { Router } from 'express';
import StatusCode from '../enums/StatusCode';
import ClubController from '../controllers/club.controller';

const clubsRoute = Router();

clubsRoute
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const club = await ClubController.getClubById(id);
      res.status(StatusCode.OK).json(club);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (_req, res) => {
    const clubs = await ClubController.getClubs();
    res.status(StatusCode.OK).json(clubs);
  });

export default clubsRoute;
