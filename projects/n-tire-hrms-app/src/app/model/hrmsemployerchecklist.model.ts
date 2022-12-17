export class hrmsemployerchecklist {
public employeeid :number;public employercheckiddesc :string;public employercheckid :number;public checkid :number;public documentname :string;public submitdate :Date;public given :boolean;public givenby :number;public givendate :Date;public owner :number;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployerchecklistResponse {
total: number;
results: hrmsemployerchecklist[];
}

