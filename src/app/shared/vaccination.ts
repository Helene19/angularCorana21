import { VaccinationPlace } from "./vaccination-place";
import { User } from "./user";

export { VaccinationPlace } from "./vaccination-place";
export { User } from "./user";

export class Vaccination {

  constructor(
    public id: number,
    public vaccination_nr: number,
    public date: Date,
    public starttime: string,
    public endtime: string,
    public max_participants: number,
    public vaccination_type: string,
    public vaccination_place: VaccinationPlace[],
    public users: User[]
  ) {
  }
}
