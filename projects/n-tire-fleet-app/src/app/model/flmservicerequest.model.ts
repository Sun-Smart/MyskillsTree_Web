export class flmservicerequest {
    public servicerequestid: number; public vehicleid: number; public servicecategory: string; public servicecategorydesc: string; public description: string; public odometerreading: number; public startdate: Date; public starttime: string; public enddate: Date; public endtime: string; public vendorid: number; public vendoriddesc: string; public reference: string; public details: string; public labourcost: number; public partscost: number; public discountpercentage: number; public discountamount: number; public tax: number; public taxamount: number; public totalcost: number; public comments: string; public attachment: string; public status: string; public DeletedflmservicerequestdetailIDs: string;
    constructor() { }
}
export interface IflmservicerequestResponse {
    total: number;
    results: flmservicerequest[];
}

