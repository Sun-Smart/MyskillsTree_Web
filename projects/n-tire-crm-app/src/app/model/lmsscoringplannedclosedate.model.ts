export class lmsscoringplannedclosedate {
public productgroupid :number;public lspciddesc :string;public lspcid :number;public days :number;public point :number;public status :string;
constructor() {}
}
export interface IlmsscoringplannedclosedateResponse {
total: number;
results: lmsscoringplannedclosedate[];
}

