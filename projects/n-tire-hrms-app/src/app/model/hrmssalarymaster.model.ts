export class hrmssalarymaster {
public salarymasteriddesc :string;public salarymasterid :number;public roleid :number;public roleiddesc :string;public salarytype :string;public salarytypedesc :string;public basic :number;public status :string;public DeletedhrmssalaryannualincomeIDs :string;public DeletedhrmssalaryregulardeductionIDs :string;public DeletedhrmssalaryregularincomeIDs :string;
constructor() {}
}
export interface IhrmssalarymasterResponse {
total: number;
results: hrmssalarymaster[];
}

