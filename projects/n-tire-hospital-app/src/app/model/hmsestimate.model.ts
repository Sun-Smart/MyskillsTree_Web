export class hmsestimate {
    public estimateid: number; public patientid: number; public estimatecode: string; public estimatedate: Date; public estimatedamount: number; public discountpercentage: number; public discountamount: number; public taxpercentage: number; public taxamount: number; public netamount: number; public comments: string; public status: string; public DeletedhmsestimatedetailIDs: string;
    constructor() { }
}
export interface IhmsestimateResponse {
    total: number;
    results: hmsestimate[];
}

