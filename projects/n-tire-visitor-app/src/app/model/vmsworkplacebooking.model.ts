export class vmsworkplacebooking {
public bookingiddesc :string;public bookingid :number;public locationid :number;public locationiddesc :string;public workplaceid :number;public workplaceiddesc :string;public startdate :Date;public starttime :string;public enddate :Date;public endtime :string;public assignedto :number;public assignedtodesc :string;public bookstatus :string;public bookstatusdesc :string;public status :string;
constructor() {}
}
export interface IvmsworkplacebookingResponse {
total: number;
results: vmsworkplacebooking[];
}

