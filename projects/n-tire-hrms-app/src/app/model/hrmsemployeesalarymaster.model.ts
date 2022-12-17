export class hrmsemployeesalarymaster {
public salarymasteriddesc :string;public salarymasterid :number;public effectivedate :Date;public roleid :number;public roleiddesc :string;public employeeid :number;public salarytype :string;public salarytypedesc :string;public basic :number;public allowances :number;public grosssalary :number;public deductions :number;public taxallowed :boolean;public tax :number;public netsalary :number;public status :string;public DeletedhrmssalaryemployeeannualincomeIDs :string;public DeletedhrmssalaryemployeeregulardeductionIDs :string;public DeletedhrmssalaryemployeeregularincomeIDs :string;
constructor() {}
}
export interface IhrmsemployeesalarymasterResponse {
total: number;
results: hrmsemployeesalarymaster[];
}

