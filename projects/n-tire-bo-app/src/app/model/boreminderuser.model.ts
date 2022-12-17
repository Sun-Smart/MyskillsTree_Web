export class boreminderuser {
public reminderuseriddesc :string;public reminderuserid :number;public remindermasterid :number;public remindermasteriddesc :string;public sourcefield :string;public sourcereference :number;public userid :number;public useriddesc :string;public status :string;
constructor() {}
}
export interface IboreminderuserResponse {
total: number;
results: boreminderuser[];
}

