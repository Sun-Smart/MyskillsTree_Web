export class hrmsinductionattendance {
public inductionid :number;public scheduleid :number;public employeeid :number;public employeeiddesc :string;public attendanceiddesc :string;public attendanceid :number;public present :boolean;public status :string;
constructor() {}
}
export interface IhrmsinductionattendanceResponse {
total: number;
results: hrmsinductionattendance[];
}

