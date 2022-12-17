export class hrmsemployeedeductionvoucher {
public branchid :number;public branchiddesc :string;public voucheriddesc :string;public voucherid :number;public transactionno :string;public transactiondate :Date;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public deductiontype :string;public deductiontypedesc :string;public amount :number;public deductinsalary :boolean;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeedeductionvoucherResponse {
total: number;
results: hrmsemployeedeductionvoucher[];
}

