export class ecmreview {
public reviewiddesc :string;public reviewid :number;public productid :number;public productiddesc :string;public customerid :number;public customeriddesc :string;public reviewdate :Date;public reviewtext :string;public rating :number;public reviewstatus :string;public reviewstatusdesc :string;public reads :number;public status :string;
constructor() {}
}
export interface IecmreviewResponse {
total: number;
results: ecmreview[];
}

