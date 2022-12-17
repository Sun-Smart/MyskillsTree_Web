export class hrmssalaryemployeeregulardeductionshistory {
public historyid :number;public salarymasterid :number;public rdiddesc :string;public rdid :number;public expenseid :number;public expenseiddesc :string;public description :string;public employeeid :number;public mode :string;public modedesc :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryemployeeregulardeductionshistoryResponse {
total: number;
results: hrmssalaryemployeeregulardeductionshistory[];
}

