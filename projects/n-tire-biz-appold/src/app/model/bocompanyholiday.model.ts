export class bocompanyholiday {
    public holidayiddesc: string; public holidayid: number; public financialyearid: number; public financialyeariddesc: string; public holidaydate: Date; public holidayday: string; public holidaydaydesc: string; public reason: string; public status: string;
    constructor() { }
}
export interface IbocompanyholidayResponse {
    total: number;
    results: bocompanyholiday[];
}

