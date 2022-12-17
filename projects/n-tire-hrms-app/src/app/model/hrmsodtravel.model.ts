export class hrmsodtravel {
public odid :number;public odtraveliddesc :string;public odtravelid :number;public traveldate :Date;public mode :string;public modedesc :string;public fromdate :Date;public todate :Date;public remarks :string;public attachment :string;public traveldetails :string;public employeeid :number;public employeeiddesc :string;public status :string;
constructor() {}
}
export interface IhrmsodtravelResponse {
total: number;
results: hrmsodtravel[];
}

