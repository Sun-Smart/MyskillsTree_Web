export class hrmssalaryemployeeregularincomeshistory {
public historyid :number;public salarymasterid :number;public riiddesc :string;public riid :number;public incomeid :number;public incomeiddesc :string;public description :string;public employeeid :number;public mode :string;public modedesc :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryemployeeregularincomeshistoryResponse {
total: number;
results: hrmssalaryemployeeregularincomeshistory[];
}

