export class mstprofileaccessdetail {
    public viewiddesc: string; public viewid: number; public userid: number; public useriddesc: string; public viewuserid: number; public viewuseriddesc: string; public viewdate: Date; public status: string;
    constructor() { }
}
export interface ImstprofileaccessdetailResponse {
    total: number;
    results: mstprofileaccessdetail[];
}

