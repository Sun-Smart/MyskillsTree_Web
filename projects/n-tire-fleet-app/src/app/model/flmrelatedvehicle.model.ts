export class flmrelatedvehicle {
    public relatedid: number; public vehicleid: number; public relatedvehicleid: number; public status: string;
    constructor() { }
}
export interface IflmrelatedvehicleResponse {
    total: number;
    results: flmrelatedvehicle[];
}

