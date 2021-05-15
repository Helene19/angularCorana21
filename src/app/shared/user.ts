import {Vaccination} from "./vaccination";

export class User {

  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public admin: boolean,
    public gender: string,
    public birthdate: Date,
    public phonenumber: number,
    public sv_number: number,
    public vaccinated: boolean,
    public street: string,
    public streetnr: string,
    public city: string,
    public postcode: number,
    public email: string,
    private password: string,
    public user_vaccinations: Vaccination[]) {
  }
}
