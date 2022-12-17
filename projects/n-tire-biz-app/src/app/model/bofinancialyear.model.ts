export class bofinancialyear {
    public finyeariddesc: string; public finyearid: number; public finyearname: string; public startdate: Date; public enddate: Date; public currentyear: boolean; public status: string;
    constructor() { }
}
export interface IbofinancialyearResponse {
    total: number;
    results: bofinancialyear[];
}

