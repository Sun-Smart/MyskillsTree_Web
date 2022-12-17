export class legalcasehearingdetailnote {
public caseid :number;public hearingnoteiddesc :string;public hearingnoteid :number;public hearingid :number;public sequence :number;public notes :string;public claim :string;public defence :string;public decision :string;public status :string;
constructor() {}
}
export interface IlegalcasehearingdetailnoteResponse {
total: number;
results: legalcasehearingdetailnote[];
}

