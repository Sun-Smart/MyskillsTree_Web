export class hrmsemployeeresignation {
public branchid :number;public branchiddesc :string;public resignationiddesc :string;public resignationid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public reference :string;public requesteddate :Date;public dateofjoining :Date;public lastworkingdate :Date;public reasontype :string;public reasontypedesc :string;public reason :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeresignationResponse {
total: number;
results: hrmsemployeeresignation[];
}

