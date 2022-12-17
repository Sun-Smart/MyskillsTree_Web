export class hrmsemployeereporting {
public employeeid :number;public reportingiddesc :string;public reportingid :number;public roleid :number;public roleiddesc :string;public reportingto :number;public reportingtodesc :string;public fromdate :Date;public todate :Date;public kraid :string;public status :string;
constructor() {}
}
export interface IhrmsemployeereportingResponse {
total: number;
results: hrmsemployeereporting[];
}

