export class hrmspermissionrequest {
public permissioniddesc :string;public permissionid :number;public reference :string;public employeeid :number;public employeeiddesc :string;public permissiondate :Date;public fromtime :string;public totime :string;public reason :string;public status :string;
constructor() {}
}
export interface IhrmspermissionrequestResponse {
total: number;
results: hrmspermissionrequest[];
}

