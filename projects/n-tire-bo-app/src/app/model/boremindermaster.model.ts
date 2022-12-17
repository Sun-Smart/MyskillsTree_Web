export class boremindermaster {
public remindermasteriddesc :string;public remindermasterid :number;public sourcefield :string;public sourcereference :number;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public priority :string;public prioritydesc :string;public reminderdate :Date;public remindertime :string;public remindertext :string;public reminderusertype :string;public reminderusertypedesc :string;public scheduletype :string;public scheduletypedesc :string;public reminderdaysbefore :string;public reminderdaysbeforedesc :string;public alarm :string;public notes :string;public customfield :string;public attachment :string;public status :string;public DeletedboreminderuserIDs :string;
constructor() {}
}
export interface IboremindermasterResponse {
total: number;
results: boremindermaster[];
}

