export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const VaccinationFormErrorMessages = [
  new ErrorMessage('vaccination_nr', 'required', 'Es muss eine Impfterminnummer angegeben werden.'),
  new ErrorMessage('date', 'required', 'Es muss das Datum des Impftermins angegeben werden.'),
  new ErrorMessage('date', 'dateValidator', 'Das Datum muss in der Zukunft liegen.'),
  new ErrorMessage('starttime', 'required', 'Es muss der Startzeitpunkt des Impftermins angegeben werden.'),
  new ErrorMessage('starttime', 'pattern', 'Der Startzeitpunkt hat die falsche Formatierung. ' +
    'Ein Beispiel für eine richtige Formatierung wäre: 11:45'),
  new ErrorMessage('endtime', 'required', 'Es muss der Endzeitpunkt des Impftermins angegeben werden.'),
  new ErrorMessage('endtime', 'pattern', 'Der Endzeitpunkt hat die falsche Formatierung. ' +
    'Ein Beispiel für eine richtige Formatierung wäre: 11:45'),
  new ErrorMessage('max_participants', 'required', 'Es muss die maximale Anzahl an Teilnehmer*innen angegeben werden.'),
  new ErrorMessage('max_participants', 'max', 'Die maximale Anzahl an Teilnehmer*innen darf maximal 25 betragen.'),
  new ErrorMessage('max_participants', 'min', 'Die maximale Anzahl an Teilnehmer*innen muss mindestens 2 betragen.'),
  new ErrorMessage('vaccination_type', 'required', 'Es muss die Art vom Impfstoff angegeben sein.'),
  new ErrorMessage('vaccination_place', 'required', 'Es muss der Impfort angegeben sein.')
];
