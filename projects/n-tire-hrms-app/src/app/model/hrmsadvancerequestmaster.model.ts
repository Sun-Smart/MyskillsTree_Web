export class hrmsadvancerequestmaster {
public requestiddesc :string;public requestid :number;public employeeid :number;public employeeiddesc :string;public requestdate :Date;public requestreference :string;public advanceamount :number;public repaymonths :number;public frommonth :string;public frommonthdesc :string;public monthlyamount :number;public toamount :number;public status :string;
constructor() {}
}
export interface IhrmsadvancerequestmasterResponse {
total: number;
results: hrmsadvancerequestmaster[];
}

