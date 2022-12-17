export class pmselectemployees {
public kpidetailiddesc :string;public kpidetailid :number;public employeekpiid :number;public employeekpiiddesc :string;public departmentid :number;public designationid :string;public designationiddesc :string;public employeeid :number;public employeeiddesc :string;public kpiid :number;public weight :number;public reviewquestions :string;public remarks :string;public status :string;
constructor() {}
}
export interface IpmselectemployeesResponse {
total: number;
results: pmselectemployees[];
}

