export class lmsreminder {
    public leadid: number; public opportunityid: number; public reminderiddesc: string; public reminderid: number; public remindertext: string; public reminderstartdatetime: Date; public frequencyhours: string; public status: string;
    constructor() { }
}
export interface IlmsreminderResponse {
    total: number;
    results: lmsreminder[];
}

