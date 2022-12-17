export class hrmsemployeemonthlysalarymaster {
public saliddesc :string;public salid :number;public employeeid :number;public month :string;public monthdesc :string;public year :number;public salarytype :string;public salarytypedesc :string;public basic :number;public grosssalary :number;public deductions :number;public netsalary :number;public status :string;public DeletedhrmsemployeemonthlyadhoccreditIDs :string;public DeletedhrmsemployeemonthlyadhocdebitIDs :string;public DeletedhrmsemployeemonthlysalaryannualincomeIDs :string;public DeletedhrmsemployeemonthlysalaryregulardeductionIDs :string;public DeletedhrmsemployeemonthlysalaryregularincomeIDs :string;
constructor() {}
}
export interface IhrmsemployeemonthlysalarymasterResponse {
total: number;
results: hrmsemployeemonthlysalarymaster[];
}

