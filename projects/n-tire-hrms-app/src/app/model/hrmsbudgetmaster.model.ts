export class hrmsbudgetmaster {
public budgetiddesc :string;public budgetid :number;public branchid :number;public branchiddesc :string;public finyear :number;public finyeardesc :string;public revisionno :number;public budgetcode :string;public budgetcreatedon :Date;public department :number;public departmentdesc :string;public remarks :string;public status :string;public DeletedhrmsbudgetdetailIDs :string;
constructor() {}
}
export interface IhrmsbudgetmasterResponse {
total: number;
results: hrmsbudgetmaster[];
}

