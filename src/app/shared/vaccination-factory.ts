import { Vaccination} from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(null, null, new Date(), '','', null,
      '', {id: 0, vaccination_place_nr: null, street: '', streetnr: '', city: '',
      postcode: null, state: '', description: ''}, []);
  }
  static fromObject(rawVaccionation: any): Vaccination {
    return new Vaccination(
      rawVaccionation.id,
      rawVaccionation.vaccination_nr,
      typeof(rawVaccionation.date) === 'string' ?
        new Date(rawVaccionation.date) : rawVaccionation.date,
      rawVaccionation.starttime,
      rawVaccionation.endtime,
      rawVaccionation.max_participants,
      rawVaccionation.vaccination_type,
      rawVaccionation.vaccination_place,
      rawVaccionation.users
    );
  }
}
