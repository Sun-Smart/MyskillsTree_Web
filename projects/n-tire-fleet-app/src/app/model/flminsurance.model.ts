export class flminsurance {
    public insuranceid: number; public vehicleid: number; public insurancecompany: string; public policyid: string; public startdate: Date; public expireddate: Date; public coveragetype: string; public coveragetypedesc: string; public coverageamount: number; public attachment: string; public remarks: string; public status: string;
    constructor() { }
}
export interface IflminsuranceResponse {
    total: number;
    results: flminsurance[];
}

