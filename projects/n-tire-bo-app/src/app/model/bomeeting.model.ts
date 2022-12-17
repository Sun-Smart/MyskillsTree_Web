export class bomeeting {
public meetingiddesc :string;public meetingid :number;public sourcefield :string;public sourcereference :number;public relatedid :number;public subject :string;public purpose :string;public goal :string;public category :string;public categorydesc :string;public startdate :Date;public starttime :string;public enddate :Date;public endtime :string;public duration :string;public durationdesc :string;public locationid :number;public location :string;public description :string;public assignedto :string;public status :string;public DeletedbomeetinginviteIDs :string;public DeletedbomeetingreminderIDs :string;
constructor() {}
}
export interface IbomeetingResponse {
total: number;
results: bomeeting[];
}

