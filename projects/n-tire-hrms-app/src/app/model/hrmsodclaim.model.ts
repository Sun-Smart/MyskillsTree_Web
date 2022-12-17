export class hrmsodclaim {
public odid :number;public claimiddesc :string;public claimid :number;public employeeid :number;public employeeiddesc :string;public claimdate :Date;public claimtype :number;public claimtypedesc :string;public claimreason :string;public currency :string;public currencydesc :string;public claimamount :number;public attachment :string;public earningvoucherid :number;public status :string;
constructor() {}
}
export interface IhrmsodclaimResponse {
total: number;
results: hrmsodclaim[];
}

