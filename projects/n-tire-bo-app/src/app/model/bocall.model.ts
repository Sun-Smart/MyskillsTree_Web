export class bocall {
public calliddesc :string;public callid :number;public screenid :string;public screeniddesc :string;public relatedid :number;public subject :string;public type :string;public typedesc :string;public category :string;public categorydesc :string;public startdate :Date;public starttime :string;public enddate :Date;public endtime :string;public duration :string;public durationdesc :string;public description :string;public assignedto :string;public status :string;public DeletedbocallinviteIDs :string;public DeletedbocallreminderIDs :string;
constructor() {}
}
export interface IbocallResponse {
total: number;
results: bocall[];
}

