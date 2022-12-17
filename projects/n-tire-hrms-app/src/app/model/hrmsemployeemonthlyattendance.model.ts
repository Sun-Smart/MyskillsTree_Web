export class hrmsemployeemonthlyattendance {
public attendanceiddesc :string;public attendanceid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public totaldays :number;public workingdays :number;public holidays :number;public presentdays :number;public approvedleavedays :number;public adhocleavedays :number;public latelophours :number;public status :string;
constructor() {}
}
export interface IhrmsemployeemonthlyattendanceResponse {
total: number;
results: hrmsemployeemonthlyattendance[];
}

