export class hmspatientpaymentdetail {
    public paymentdetailid: number; public paymentid: number; public visitid: number; public patientid: number; public chargetype: number; public chargetypedesc: string; public details: string; public rate: number; public quantity: number; public total: string; public status: string;
    constructor() { }
}
export interface IhmspatientpaymentdetailResponse {
    total: number;
    results: hmspatientpaymentdetail[];
}

