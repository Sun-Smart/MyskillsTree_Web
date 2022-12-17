export class hrmsemployeedailyattendance {
public attendanceiddesc :string;public attendanceid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public shiftid :number;public shiftiddesc :string;public attendancedate :Date;public shiftin :string;public shiftout :string;public actualin :string;public actualout :string;public extratime :string;public shorttime :string;public flag :string;public flagdesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IhrmsemployeedailyattendanceResponse {
total: number;
results: hrmsemployeedailyattendance[];
}

