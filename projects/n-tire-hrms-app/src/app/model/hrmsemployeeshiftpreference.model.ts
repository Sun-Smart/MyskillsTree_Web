export class hrmsemployeeshiftpreference {
public prefiddesc :string;public prefid :number;public employeeid :number;public employeeiddesc :string;public shiftid :number;public fromdate :Date;public todate :Date;public reason :string;public approvalstatus :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeshiftpreferenceResponse {
total: number;
results: hrmsemployeeshiftpreference[];
}

