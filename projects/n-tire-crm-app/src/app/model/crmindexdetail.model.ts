export class crmindexdetail {
public indexid :number;public indexdetailiddesc :string;public indexdetailid :number;public value :string;public parentindexdetail :number;public status :string;
constructor() {}
}
export interface IcrmindexdetailResponse {
total: number;
results: crmindexdetail[];
}

