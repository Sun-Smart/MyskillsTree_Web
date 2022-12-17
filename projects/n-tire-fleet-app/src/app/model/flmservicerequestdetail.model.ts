export class flmservicerequestdetail {
    public servicetaskid: number; public servicerequestid: number; public taskid: number; public taskiddesc: string; public description: string; public vehicleissueid1: number; public vehicleissueid2: number; public labourcost: number; public itemcost: number; public remarks: string; public status: string;
    constructor() { }
}
export interface IflmservicerequestdetailResponse {
    total: number;
    results: flmservicerequestdetail[];
}

