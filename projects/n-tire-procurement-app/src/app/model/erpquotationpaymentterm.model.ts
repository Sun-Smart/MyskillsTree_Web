export class erpquotationpaymentterm {
public supplierid :number;public supplieriddesc :string;public rfqid :number;public rfqiddesc :string;public quoteid :number;public quoteiddesc :string;public paytermiddesc :string;public paytermid :number;public paymenttermtype :string;public paymenttermtypedesc :string;public percentage :string;public description :string;public amount :string;public status :string;
constructor() {}
}
export interface IerpquotationpaymenttermResponse {
total: number;
results: erpquotationpaymentterm[];
}

