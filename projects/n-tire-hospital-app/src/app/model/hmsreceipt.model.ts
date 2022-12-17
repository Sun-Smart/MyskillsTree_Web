export class hmsreceipt {
    public receiptid: number; public patientid: number; public doctorid: number; public doctoriddesc: string; public receiptcode: string; public receiptdate: Date; public receipttime: string; public paymentcategory: string; public paymentcategorydesc: string; public outstandingamount: number; public paymentmode: string; public paymentmodedesc: string; public paidamount: number; public reference: string; public status: string;
    constructor() { }
}
export interface IhmsreceiptResponse {
    total: number;
    results: hmsreceipt[];
}

