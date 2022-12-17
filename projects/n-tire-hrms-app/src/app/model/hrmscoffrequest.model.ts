export class hrmscoffrequest {
public coffiddesc :string;public coffid :number;public coffreference :string;public employeeid :number;public employeeiddesc :string;public workrequestid :number;public coffdate :Date;public reason :string;public status :string;
constructor() {}
}
export interface IhrmscoffrequestResponse {
total: number;
results: hrmscoffrequest[];
}

