export class legalcasereferredcase {
public linkediddesc :string;public linkedid :number;public caseid :number;public caseiddesc :string;public linkedcaseid :number;public linkedcaseiddesc :string;public status :string;
constructor() {}
}
export interface IlegalcasereferredcaseResponse {
total: number;
results: legalcasereferredcase[];
}

