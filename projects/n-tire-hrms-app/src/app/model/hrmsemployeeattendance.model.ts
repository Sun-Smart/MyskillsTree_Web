export class hrmsemployeeattendance {
public txniddesc :string;public txnid :number;public txndate :Date;public employeeid :number;public intime :Date;public outtime :Date;public status :string;
constructor() {}
}
export interface IhrmsemployeeattendanceResponse {
total: number;
results: hrmsemployeeattendance[];
}

