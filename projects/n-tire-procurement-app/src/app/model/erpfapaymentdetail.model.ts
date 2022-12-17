export class erpfapaymentdetail {
    public paymentdetailiddesc: string; public paymentdetailid: number; public paymentid: number; public paymentdetails: string; public invoiceid: number; public invoiceiddesc: string; public reference: string; public invoicedate: Date; public totalvalue: string; public discountamount: string; public tax1: string; public tax2: string; public taxdeduction: string; public othercharges: string; public invoiceamount: string; public paid: string; public balance: string; public narration: string; public status: string;
    constructor() { }
}
export interface IerpfapaymentdetailResponse {
    total: number;
    results: erpfapaymentdetail[];
}

