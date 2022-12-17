export class hrmssalaryannualincome {
public salarymasterid :number;public aiiddesc :string;public aiid :number;public annualincomeid :number;public annualincomeiddesc :string;public mode :string;public modedesc :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public redemptioneveryyear :number;public status :string;
constructor() {}
}
export interface IhrmssalaryannualincomeResponse {
total: number;
results: hrmssalaryannualincome[];
}

