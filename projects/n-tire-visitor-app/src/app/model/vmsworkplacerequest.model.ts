export class vmsworkplacerequest {
public requestiddesc :string;public requestid :number;public locationid :number;public locationiddesc :string;public workplaceid :number;public workplaceiddesc :string;public startdate :Date;public starttime :string;public enddate :Date;public endtime :string;public requestedby :number;public requestedbydesc :string;public projectid :number;public projectiddesc :string;public requeststatus :string;public requeststatusdesc :string;public notes :string;public status :string;
constructor() {}
}
export interface IvmsworkplacerequestResponse {
total: number;
results: vmsworkplacerequest[];
}

