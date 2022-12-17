export class erptenderdetail {
public tenderdetailiddesc :string;public tenderdetailid :number;public tenderid :number;public tenderiddesc :string;public itemid :number;public itemiddesc :string;public description :string;public details :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public estimatedvalue :number;public finalsupplierid :number;public finalsupplieriddesc :string;public finalquantity :number;public finalunitprice :number;public finalcost :number;public status :string;
constructor() {}
}
export interface IerptenderdetailResponse {
total: number;
results: erptenderdetail[];
}

