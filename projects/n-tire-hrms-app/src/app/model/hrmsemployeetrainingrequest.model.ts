export class hrmsemployeetrainingrequest {
public branchid :number;public branchiddesc :string;public requestiddesc :string;public requestid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public course :number;public coursedesc :string;public skilllevel :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetrainingrequestResponse {
total: number;
results: hrmsemployeetrainingrequest[];
}

