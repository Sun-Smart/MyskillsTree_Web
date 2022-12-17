export class hrmsemployeestatutorybenefit {
public statutoryid :number;public statutoryiddesc :string;public esiddesc :string;public esid :number;public employeeid :number;public fromamount :number;public toamount :number;public employerpercentage :number;public employeepercentage :number;public employeramount :number;public employeeamount :number;public accountreference :string;public opendate :Date;public closeddate :Date;public info1 :string;public info2 :string;public status :string;
constructor() {}
}
export interface IhrmsemployeestatutorybenefitResponse {
total: number;
results: hrmsemployeestatutorybenefit[];
}

