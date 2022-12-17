export class hmsestimatedetail {
    public estimatedetailid: number; public estimateid: number; public patientid: number; public code: string; public details: string; public rate: number; public quantity: number; public totalamount: number; public status: string;
    constructor() { }
}
export interface IhmsestimatedetailResponse {
    total: number;
    results: hmsestimatedetail[];
}

