export class hrmsinductionemployee {
public employeeinductioniddesc :string;public employeeinductionid :number;public inductionid :number;public employeeid :number;public employeeiddesc :string;public status :string;
constructor() {}
}
export interface IhrmsinductionemployeeResponse {
total: number;
results: hrmsinductionemployee[];
}

