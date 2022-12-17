export class hrmsemployeecareer {
public employeeid :number;public haciddesc :string;public hacid :number;public employer :string;public jobfield :string;public jobfielddesc :string;public designation :string;public mappedtoourrole :number;public mappedtoourroledesc :string;public fromdate :Date;public todate :Date;public totalmonths :number;public ctccurrency :string;public startctcamount :number;public endctcamount :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeecareerResponse {
total: number;
results: hrmsemployeecareer[];
}

