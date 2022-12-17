export class hrmsemployeemonthlyadhoccredit {
public salid :number;public month :string;public monthdesc :string;public year :number;public employeeid :number;public employeeiddesc :string;public adhoccredithead :number;public adhoccreditheaddesc :string;public value :number;public pkiddesc :string;public pkid :number;public status :string;
constructor() {}
}
export interface IhrmsemployeemonthlyadhoccreditResponse {
total: number;
results: hrmsemployeemonthlyadhoccredit[];
}

