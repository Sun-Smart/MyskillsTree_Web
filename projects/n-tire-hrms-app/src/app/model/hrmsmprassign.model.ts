export class hrmsmprassign {
public mprid :number;public assigniddesc :string;public assignid :number;public assignedowner :number;public assignedownerdesc :string;public assignedquantity :number;public offered1 :number;public joined1 :number;public startdate1 :Date;public completiondate1 :Date;public offered2 :number;public joined2 :number;public startdate2 :Date;public completiondate2 :Date;public offered3 :number;public joined3 :number;public startdate3 :Date;public completiondate3 :Date;public offered4 :number;public joined4 :number;public startdate4 :Date;public completiondate4 :Date;public offered5 :number;public joined5 :number;public startdate5 :Date;public completiondate5 :Date;public status :string;
constructor() {}
}
export interface IhrmsmprassignResponse {
total: number;
results: hrmsmprassign[];
}

