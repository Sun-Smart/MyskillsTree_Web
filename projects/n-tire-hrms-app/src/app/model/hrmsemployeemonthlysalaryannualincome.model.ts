export class hrmsemployeemonthlysalaryannualincome {
public salid :number;public month :string;public year :number;public employeeid :number;public employeeiddesc :string;public deductionhead :number;public deductionheaddesc :string;public value :number;public pkiddesc :string;public pkid :number;public status :string;
constructor() {}
}
export interface IhrmsemployeemonthlysalaryannualincomeResponse {
total: number;
results: hrmsemployeemonthlysalaryannualincome[];
}

