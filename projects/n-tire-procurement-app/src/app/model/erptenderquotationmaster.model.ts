export class erptenderquotationmaster {
public tenderid :number;public tenderiddesc :string;public quotationiddesc :string;public quotationid :number;public supplierid :number;public supplieriddesc :string;public othersupplier :string;public supplieremail :string;public quotationreference :string;public versionnumber :number;public quotationdate :Date;public expirationdate :Date;public quotationamount :string;public paymentterms :string;public paymenttermsdesc :string;public quotationremarks :string;public customfield :string;public attachment :string;public status :string;public statusremarks :string;public DeletederptenderquotationanswerIDs :string;public DeletederptenderquotationdetailIDs :string;
constructor() {}
}
export interface IerptenderquotationmasterResponse {
total: number;
results: erptenderquotationmaster[];
}

