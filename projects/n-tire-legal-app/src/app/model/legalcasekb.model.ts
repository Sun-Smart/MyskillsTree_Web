export class legalcasekb {
public kbcaseiddesc :string;public kbcaseid :number;public caseid :number;public kbid :number;public status :string;
constructor() {}
}
export interface IlegalcasekbResponse {
total: number;
results: legalcasekb[];
}

