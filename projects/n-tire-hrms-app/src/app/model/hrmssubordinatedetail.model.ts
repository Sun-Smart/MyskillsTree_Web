export class hrmssubordinatedetail {
public employeeid :number;public subiddesc :string;public subid :number;public roleid :number;public roleiddesc :string;public subordinateto :number;public subordinatetodesc :string;public fromdate :Date;public todate :Date;public kraid :string;public status :string;
constructor() {}
}
export interface IhrmssubordinatedetailResponse {
total: number;
results: hrmssubordinatedetail[];
}

