export class hlpslasupporthour {
    public supportiddesc: string; public supportid: number; public servicelevelid: number; public weekday: string; public weekdaydesc: string; public starttime: string; public endtime: string; public status: string;
    constructor() { }
}
export interface IhlpslasupporthourResponse {
    total: number;
    results: hlpslasupporthour[];
}

