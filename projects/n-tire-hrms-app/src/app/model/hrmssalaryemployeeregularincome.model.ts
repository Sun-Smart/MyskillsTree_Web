export class hrmssalaryemployeeregularincome {
public salarymasterid :number;public riiddesc :string;public riid :number;public incomeid :number;public description :string;public employeeid :number;public mode :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryemployeeregularincomeResponse {
total: number;
results: hrmssalaryemployeeregularincome[];
}

