export class VaccinationPlace {

  constructor(
    public id: number,
    public vaccination_place_nr: number,
    public street: string,
    public streetnr: string,
    public city: string,
    public postcode: number,
    public state: string,
    public description?: string) {
  }
}
