export class bobranchholiday {
    public branchholidayiddesc: string; public branchholidayid: number; public branchid: number; public financialyearid: number; public financialyeariddesc: string; public holidaydate: Date; public holidayday: string; public holidaydaydesc: string; public reason: string; public status: string;
    constructor() { }
}
export interface IbobranchholidayResponse {
    total: number;
    results: bobranchholiday[];
}

