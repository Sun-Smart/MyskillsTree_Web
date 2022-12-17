export class hmspayment {
    public paymentid: number; public paymentreference: string; public debitaccountid: number; public debitaccountiddesc: string; public creditaccountid: number; public creditaccountiddesc: string; public transactionamount: number; public paymentmode: string; public paymentmodedesc: string; public narration: string; public notes: string; public status: string;
    constructor() { }
}
export interface IhmspaymentResponse {
    total: number;
    results: hmspayment[];
}

