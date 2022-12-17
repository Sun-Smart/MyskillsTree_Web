export class mstapplicantreferencedetail {
    public applicantid: number; public applicantiddesc: string; public referenceiddesc: string; public referenceid: number; public referencetype: string; public referencetypedesc: string; public referencename: string; public companyname: string; public designation: string; public mobilenumber: string; public email: string; public knownduration: string; public isrelative: boolean; public remarks: string; public requestid: number; public referenceacceptance: string; public referenceacceptancedesc: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ImstapplicantreferencedetailResponse {
    total: number;
    results: mstapplicantreferencedetail[];
}

