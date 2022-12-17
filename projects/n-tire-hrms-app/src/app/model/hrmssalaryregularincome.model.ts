export class hrmssalaryregularincome {
public salarymasterid :number;public riiddesc :string;public riid :number;public incomeid :number;public incomeiddesc :string;public mode :string;public modedesc :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public lop :boolean;public status :string;
constructor() {}
}
export interface IhrmssalaryregularincomeResponse {
total: number;
results: hrmssalaryregularincome[];
}

