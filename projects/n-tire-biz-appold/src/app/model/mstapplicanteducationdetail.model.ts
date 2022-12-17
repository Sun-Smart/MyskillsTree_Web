export class mstapplicanteducationdetail {
    public applicantid: number; public applicantiddesc: string; public educationiddesc: string; public educationid: number; public educationcategory: number; public educationcategorydesc: string; public educationsubcategory: number; public educationsubcategorydesc: string; public coursename: string; public institutionname: string; public fromyear: number; public toyear: number; public percentage: string; public requestid: number; public referenceacceptance: string; public referenceacceptancedesc: string; public remarks: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ImstapplicanteducationdetailResponse {
    total: number;
    results: mstapplicanteducationdetail[];
}

