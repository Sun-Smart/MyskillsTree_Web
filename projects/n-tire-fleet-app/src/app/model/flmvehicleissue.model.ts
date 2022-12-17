export class flmvehicleissue {
    public issueid: number; public description: string; public vehicleid: number; public issuedate: Date; public detaildescription: string; public odometer: number; public issuecategory: string; public issuecategorydesc: string; public severity: string; public severitydesc: string; public priority: string; public prioritydesc: string; public reportedby: number; public reportedbydesc: string; public assignedto: number; public assignedtodesc: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IflmvehicleissueResponse {
    total: number;
    results: flmvehicleissue[];
}

