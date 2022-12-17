export class hmsinsurance {
    public insuranceid: number; public patientid: number; public insurancedperson: string; public relationship: string; public relationshipdesc: string; public insuranceno: string; public coverageamount: number; public notes: string; public status: string;
    constructor() { }
}
export interface IhmsinsuranceResponse {
    total: number;
    results: hmsinsurance[];
}

