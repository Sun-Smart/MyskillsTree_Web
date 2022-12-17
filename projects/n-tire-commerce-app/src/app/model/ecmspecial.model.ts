export class ecmspecial {
public specialiddesc :string;public specialid :number;public productid :number;public productiddesc :string;public specialprice :number;public startdate :Date;public enddate :Date;public specialstatus :string;public specialstatusdesc :string;public status :string;
constructor() {}
}
export interface IecmspecialResponse {
total: number;
results: ecmspecial[];
}

