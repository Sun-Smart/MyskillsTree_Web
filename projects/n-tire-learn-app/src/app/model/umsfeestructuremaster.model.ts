export class umsfeestructuremaster {
    public feeid: number; public description: string; public courseid: number; public courseiddesc: string; public semesterid: number; public semesteriddesc: string; public totalfee: number; public startdate: Date; public enddate: Date; public status: string; public DeletedumsfeestructuredetailIDs: string;
    constructor() { }
}
export interface IumsfeestructuremasterResponse {
    total: number;
    results: umsfeestructuremaster[];
}

