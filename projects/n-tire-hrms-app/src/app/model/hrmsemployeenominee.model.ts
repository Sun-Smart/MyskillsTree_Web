export class hrmsemployeenominee {
public nomineeiddesc :string;public nomineeid :number;public employeeid :number;public employeeiddesc :string;public relationship :string;public relationshipdesc :string;public firstname :string;public lastname :string;public fromdate :Date;public todate :Date;public phone :string;public email :string;public details :string;public benefittype :string;public benefittypedesc :string;public percentshare :number;public nominationendreason :string;public nominationendreasondesc :string;public status :string;
constructor() {}
}
export interface IhrmsemployeenomineeResponse {
total: number;
results: hrmsemployeenominee[];
}

