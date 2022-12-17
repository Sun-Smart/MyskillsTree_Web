export class boprocesstask {
public taskprocessiddesc :string;public taskprocessid :number;public processgroupid :number;public processid :number;public assigneduser :string;public assigneddatetime :Date;public closeddatetime :Date;public description :string;public details :string;public performancestatus :string;public performancestatusdesc :string;public standard :string;public standarddesc :string;public exception :string;public allcomments :string;public comments :string;public status :string;public sourcefield :string;public keyid :number;public keyiddesc :string;public DeletedboprocesstaskformIDs :string;
constructor() {}
}
export interface IboprocesstaskResponse {
total: number;
results: boprocesstask[];
}

