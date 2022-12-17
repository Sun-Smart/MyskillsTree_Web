export class hrmsemployeesalarymastershistory {
public salarymasteriddesc :string;public salarymasterid :number;public effectivedate :Date;public roleid :number;public roleiddesc :string;public employeeid :number;public salarytype :string;public salarytypedesc :string;public basic :number;public status :string;public DeletedhrmssalaryemployeeannualincomeshistoryIDs :string;public DeletedhrmssalaryemployeeregulardeductionshistoryIDs :string;public DeletedhrmssalaryemployeeregularincomeshistoryIDs :string;
constructor() {}
}
export interface IhrmsemployeesalarymastershistoryResponse {
total: number;
results: hrmsemployeesalarymastershistory[];
}

