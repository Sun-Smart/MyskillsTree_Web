export class hrmsbudgetdetail {
public budgetid :number;public branchid :number;public branchiddesc :string;public revisionno :number;public detailiddesc :string;public detailid :number;public roleid :number;public roleiddesc :string;public m1 :number;public m2 :number;public m3 :number;public m4 :number;public m5 :number;public m6 :number;public m7 :number;public m8 :number;public m9 :number;public m10 :number;public m11 :number;public m12 :number;public status :string;
constructor() {}
}
export interface IhrmsbudgetdetailResponse {
total: number;
results: hrmsbudgetdetail[];
}

