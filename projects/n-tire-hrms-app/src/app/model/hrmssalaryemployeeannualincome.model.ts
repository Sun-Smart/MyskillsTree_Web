export class hrmssalaryemployeeannualincome {
public salarymasterid :number;public aiiddesc :string;public aiid :number;public employeeid :number;public annualincomeid :number;public description :string;public mode :string;public combination :string;public value :number;public ceiling :number;public modify :boolean;public redemptioneveryyear :number;public status :string;
constructor() {}
}
export interface IhrmssalaryemployeeannualincomeResponse {
total: number;
results: hrmssalaryemployeeannualincome[];
}

