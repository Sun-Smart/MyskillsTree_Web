export class hrmstrainingattendance {
public trainingid :number;public trainingiddesc :string;public scheduleid :number;public employeeid :number;public attendanceiddesc :string;public attendanceid :number;public attendancedate :Date;public present :boolean;public status :string;
constructor() {}
}
export interface IhrmstrainingattendanceResponse {
total: number;
results: hrmstrainingattendance[];
}

