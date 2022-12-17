export class hrmssalaryemployeeregulardeduction {
public salarymasterid :number;public rdiddesc :string;public rdid :number;public expenseid :number;public description :string;public employeeid :number;public mode :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryemployeeregulardeductionResponse {
total: number;
results: hrmssalaryemployeeregulardeduction[];
}

