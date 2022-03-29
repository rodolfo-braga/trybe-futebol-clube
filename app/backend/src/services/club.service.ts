import ErrorMessage from '../enums/ErrorMessage';
import Club from '../database/models/Club';

export default class ClubService {
  static async getClubs(): Promise<Club[]> {
    const clubs = await Club.findAll();
    return clubs;
  }

  static async getClubById(id: string): Promise<Club> {
    const club = await Club.findByPk(id);
    if (!club) throw new Error(ErrorMessage.CLUB_NOT_FOUND);
    return club;
  }
}
