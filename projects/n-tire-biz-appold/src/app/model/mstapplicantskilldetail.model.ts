export class mstapplicantskilldetail {
    public applicantid: number; public referencecount: number; public referenceacceptedcount: number; public referencerejactedcount: number; public applicantiddesc: string; public skilliddesc: string; public skillid: number; public skillcategory: number; public skillcategorydesc: string; public subcategoryid: number; public subcategoryiddesc: string; public selfrating: number; public remarks: string; public requestid: number; public referenceacceptance: string; public referenceacceptancedesc: string; public attachment: string; public status: string; public showorhide: boolean; public segmentcategoryothers: string; public skillcategoryothers: string; public subcategoryidothers: string;
    constructor() { }
}
export interface ImstapplicantskilldetailResponse {
    total: number;
    results: mstapplicantskilldetail[];
}

