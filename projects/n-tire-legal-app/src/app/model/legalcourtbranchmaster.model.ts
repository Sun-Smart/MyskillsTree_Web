export class legalcourtbranchmaster {
public courtbranchiddesc :string;public courtbranchid :number;public branchid :number;public courtid :number;public status :string;
constructor() {}
}
export interface IlegalcourtbranchmasterResponse {
total: number;
results: legalcourtbranchmaster[];
}

