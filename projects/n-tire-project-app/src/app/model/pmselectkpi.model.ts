export class pmselectkpi {
public employeekpiiddesc :string;public employeekpiid :number;public departmentid :number;public departmentiddesc :string;public designationid :string;public designationiddesc :string;public employeeid :number;public employeeiddesc :string;public status :string;public DeletedpmemployeekpiIDs :string;
constructor() {}
}
export interface IpmselectkpiResponse {
total: number;
results: pmselectkpi[];
}

