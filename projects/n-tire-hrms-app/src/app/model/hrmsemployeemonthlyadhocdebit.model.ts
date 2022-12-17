export class hrmsemployeemonthlyadhocdebit {
public salid :number;public month :string;public year :number;public employeeid :number;public employeeiddesc :string;public adhocdebithead :number;public adhocdebitheaddesc :string;public value :number;public pkiddesc :string;public pkid :number;public status :string;
constructor() {}
}
export interface IhrmsemployeemonthlyadhocdebitResponse {
total: number;
results: hrmsemployeemonthlyadhocdebit[];
}

