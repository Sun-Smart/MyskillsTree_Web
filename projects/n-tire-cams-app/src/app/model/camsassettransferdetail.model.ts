export class camsassettransferdetail {
public branchid :number;public transferdetailiddesc :string;public transferdetailid :number;public transferid :number;public assetid :number;public assetiddesc :string;public transferqty :string;public originalcost :string;public accumulateddepriciation :string;public wdv :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamsassettransferdetailResponse {
total: number;
results: camsassettransferdetail[];
}

