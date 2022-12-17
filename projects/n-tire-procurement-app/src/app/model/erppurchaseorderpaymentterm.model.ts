export class erppurchaseorderpaymentterm {
public poid :number;public poiddesc :string;public customerid :number;public rfqid :number;public rfqiddesc :string;public quoteid :number;public quoteiddesc :string;public paytermiddesc :string;public paytermid :number;public paymenttermtype :string;public paymenttermtypedesc :string;public percentage :string;public description :string;public currency :number;public amount :string;public approvalremarks :string;public apid :number;public status :string;
constructor() {}
}
export interface IerppurchaseorderpaymenttermResponse {
total: number;
results: erppurchaseorderpaymentterm[];
}

