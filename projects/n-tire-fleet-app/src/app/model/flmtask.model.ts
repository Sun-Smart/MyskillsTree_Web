export class flmtask {
    public taskid: number; public description: string; public details: string; public frequency: number; public frequencyunit: string; public frequencyunitdesc: string; public measurementparameter: string; public measurementparameterdesc: string; public measurementvalue: number; public status: string;
    constructor() { }
}
export interface IflmtaskResponse {
    total: number;
    results: flmtask[];
}

