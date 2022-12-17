export class ltylevel {
public leveliddesc :string;public levelid :number;public name :string;public description :string;public qualifyingpoints :number;public minimumtierlength :number;public qualifyingperiodlength :number;public tierenddate :Date;public recurringperiod :string;public recurringperioddesc :string;public assessmentday :number;public assessmentdaydesc :string;public assessmentmonth :number;public assessmentmonthdesc :string;public status :string;public DeletedltycustomerlevelIDs :string;
constructor() {}
}
export interface IltylevelResponse {
total: number;
results: ltylevel[];
}

