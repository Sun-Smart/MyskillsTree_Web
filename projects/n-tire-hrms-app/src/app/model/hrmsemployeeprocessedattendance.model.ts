export class hrmsemployeeprocessedattendance {
public txniddesc :string;public txnid :number;public txndate :Date;public employeeid :number;public intime :Date;public outtime :Date;public modifedby :number;public modifiedon :Date;public reasonshortfall :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeprocessedattendanceResponse {
total: number;
results: hrmsemployeeprocessedattendance[];
}

