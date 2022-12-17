export class hrmssalaryregulardeduction {
public salarymasterid :number;public rdiddesc :string;public rdid :number;public expenseid :number;public expenseiddesc :string;public mode :string;public modedesc :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryregulardeductionResponse {
total: number;
results: hrmssalaryregulardeduction[];
}

