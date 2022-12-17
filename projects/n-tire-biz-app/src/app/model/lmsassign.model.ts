export class lmsassign {
    public productgroupid: number; public productgroupiddesc: string; public productid: number; public productiddesc: string; public source: string; public sourcedesc: string; public assigntype: string; public assigntypedesc: string; public assignuser: number; public assignuserdesc: string; public assignrole: number; public assignroledesc: string; public assigniddesc: string; public assignid: number; public skillratefrom: number; public skillrateto: number; public certified: boolean; public status: string;
    constructor() { }
}
export interface IlmsassignResponse {
    total: number;
    results: lmsassign[];
}

