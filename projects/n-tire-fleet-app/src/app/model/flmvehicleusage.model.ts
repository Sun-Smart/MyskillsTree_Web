export class flmvehicleusage {
    public vehicleusageid: number; public vehicleid: number; public usageid: number; public status: string;
    constructor() { }
}
export interface IflmvehicleusageResponse {
    total: number;
    results: flmvehicleusage[];
}

