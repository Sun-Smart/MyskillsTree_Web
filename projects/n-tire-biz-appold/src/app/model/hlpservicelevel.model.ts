export class hlpservicelevel {
    public serviceleveliddesc: string; public servicelevelid: number; public servicelevelcode: string; public details: string; public type: string; public typedesc: string; public category: string; public categorydesc: string; public serviceid: number; public purpose: string; public scope: string; public responsibilities: string; public criticality: string; public objectives: string; public communications: string; public measurements: string; public escalationrule: number; public isdefault: boolean; public holidaylistid: number; public holidaylistiddesc: string; public startdate: Date; public enddate: Date; public supportcontacts: number; public maxissues: number; public knowledgebaseid: number; public notes: string; public status: string; public customfield: string; public attachment: string; public Deleted_hlpslapriority_IDs: string; public Deleted_hlpslasupporthour_IDs: string;
    constructor() { }
}
export interface IhlpservicelevelResponse {
    total: number;
    results: hlpservicelevel[];
}

