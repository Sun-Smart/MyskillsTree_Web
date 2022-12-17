export class hrmsretirement {
public branchid :number;public branchiddesc :string;public retirementiddesc :string;public retirementid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public reference :string;public requesteddate :Date;public serviceyears :number;public servicemonths :number;public retirementreason :string;public retirementreasondesc :string;public details :string;public issueddate :Date;public superannuationdate :Date;public lastpaydate :Date;public finalamount :number;public finalapprovedamount :number;public status :string;
constructor() {}
}
export interface IhrmsretirementResponse {
total: number;
results: hrmsretirement[];
}

