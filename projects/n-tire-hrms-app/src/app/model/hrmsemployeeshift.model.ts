export class hrmsemployeeshift {
public txniddesc :string;public txnid :number;public employeeid :number;public employeeiddesc :string;public shiftdate :Date;public shiftid :number;public status :string;
constructor() {}
}
export interface IhrmsemployeeshiftResponse {
total: number;
results: hrmsemployeeshift[];
}

