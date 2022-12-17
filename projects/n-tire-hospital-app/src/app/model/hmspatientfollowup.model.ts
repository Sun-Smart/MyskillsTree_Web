export class hmspatientfollowup {
    public followupid: number; public patientid: number; public remindertype: string; public remindertypedesc: string; public remindertext: string; public reminderdate: Date; public remindersent: boolean; public secondremindersent: boolean; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmspatientfollowupResponse {
    total: number;
    results: hmspatientfollowup[];
}

