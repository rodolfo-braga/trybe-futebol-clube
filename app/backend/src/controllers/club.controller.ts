import ClubService from '../services/club.service';
import Club from '../database/models/Club';

export default class ClubController {
  static async getClubs(): Promise<Club[]> {
    const clubs = await ClubService.getClubs();
    return clubs;
  }

  static async getClubById(id: string): Promise<Club> {
    const club = await ClubService.getClubById(id);
    return club;
  }
}
