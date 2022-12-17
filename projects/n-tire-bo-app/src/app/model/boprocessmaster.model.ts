export class boprocessmaster {
public processgroupid :number;public processgroupiddesc :string;public processmasteriddesc :string;public processmasterid :number;public ordernumber :number;public processname :string;public description :string;public predecessor :string;public assigncondition :string;public approvers :string;public tathours :string;public numapprovers :number;public sendmail :boolean;public taskname :string;public taskdescription :string;public notificationsubject :string;public notificationbody :string;public standardrating :string;public canstopworkflow :boolean;public allowrequestchange :boolean;public allowreassignment :boolean;public reassignmentsubject :string;public reassignmentbody :string;public requestchangesubject :string;public requestchangebody :string;public formtype :string;public formtypedesc :string;public sourcefield :string;public status :string;public DeletedboprocessformIDs :string;
constructor() {}
}
export interface IboprocessmasterResponse {
total: number;
results: boprocessmaster[];
}

