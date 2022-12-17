export class hrmsemployeekeyevent {
public keyeventiddesc :string;public keyeventid :number;public employeeid :number;public employeeiddesc :string;public keyeventtype :string;public keyeventtypedesc :string;public startdate :Date;public enddate :Date;public rating :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeekeyeventResponse {
total: number;
results: hrmsemployeekeyevent[];
}

