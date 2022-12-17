export class hrmsemployeemonthlysalaryregularincome {
public salid :number;public month :string;public monthdesc :string;public year :string;public employeeid :number;public employeeiddesc :string;public incomehead :number;public incomeheaddesc :string;public value :number;public pkiddesc :string;public pkid :number;public status :string;
constructor() {}
}
export interface IhrmsemployeemonthlysalaryregularincomeResponse {
total: number;
results: hrmsemployeemonthlysalaryregularincome[];
}

