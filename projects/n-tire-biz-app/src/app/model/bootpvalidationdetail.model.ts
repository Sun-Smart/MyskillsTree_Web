export class bootpvalidationdetail {
    public otpiddesc: string; public otpid: number; public userid: number; public useriddesc: string; public otpnumber: number; public validtill: Date; public status: string;
    constructor() { }
}
export interface IbootpvalidationdetailResponse {
    total: number;
    results: bootpvalidationdetail[];
}

