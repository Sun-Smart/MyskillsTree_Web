export class hmspatientpaymentmaster {
    public paymentid: number; public visitid: number; public patientid: number; public doctorid: number; public paymentcode: string; public paymentdate: Date; public totalamount: number; public discountpercentage: number; public discountamount: number; public taxpercentage: number; public taxamount: number; public netamount: number; public paid: string; public amountpaid: number; public paymentdoneby: string; public status: string; public DeletedhmspatientpaymentdetailIDs: string;
    constructor() { }
}
export interface IhmspatientpaymentmasterResponse {
    total: number;
    results: hmspatientpaymentmaster[];
}

