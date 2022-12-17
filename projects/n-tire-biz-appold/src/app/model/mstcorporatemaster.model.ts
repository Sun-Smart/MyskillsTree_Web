export class mstcorporatemaster {
    public corporateiddesc: string; public corporateid: number; public companyname: string; public tlnumber: string; public taxregistrationnumber: string; public licensevalidto: Date; public kycupload: string; public userid: number; public status: string; public Deleted_mstcorporatelocation_IDs: string; public Deleted_mstjobrequirement_IDs: string; public Deleted_mstjobstatus_IDs: string;
    constructor() { }
}
export interface ImstcorporatemasterResponse {
    total: number;
    results: mstcorporatemaster[];
}

