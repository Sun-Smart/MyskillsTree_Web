export class camsworkitem {
public workorderitemiddesc :string;public workorderitemid :number;public workorderdetailid :number;public workorderdetailiddesc :string;public workorderid :number;public workorderiddesc :string;public scheduleid :number;public pmitemid :number;public pmid :number;public pmiddesc :string;public itemid :number;public itemiddesc :string;public suggestedquantity :number;public actualquantity :number;public instructions :string;public costshare :number;public completeddate :Date;public completednotes :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamsworkitemResponse {
total: number;
results: camsworkitem[];
}

