export class hrmsemployeeloanrequest {
public branchid :number;public branchiddesc :string;public loaniddesc :string;public loanid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public loanschemeid :number;public loanreference :string;public referencedate :Date;public requestamount :number;public requiredfrom :Date;public numinstallments :number;public emi :number;public reason :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeloanrequestResponse {
total: number;
results: hrmsemployeeloanrequest[];
}

