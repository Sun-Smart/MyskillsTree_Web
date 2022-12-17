export class flmassignment {
    public assignmentid: number; public vehicleid: number; public description: string; public userid: number; public useriddesc: string; public startdate: Date; public starttime: string; public odometerstart: number; public enddate: Date; public endtime: string; public odometerend: number; public userremarks: string; public comments: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IflmassignmentResponse {
    total: number;
    results: flmassignment[];
}

