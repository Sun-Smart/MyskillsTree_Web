export class hrmsodadvance {
public odid :number;public odadvanceiddesc :string;public odadvanceid :number;public currency :string;public currencydesc :string;public amount :string;public employeeid :number;public employeeiddesc :string;public status :string;
constructor() {}
}
export interface IhrmsodadvanceResponse {
total: number;
results: hrmsodadvance[];
}

