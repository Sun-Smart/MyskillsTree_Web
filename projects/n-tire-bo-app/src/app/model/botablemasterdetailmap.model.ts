export class botablemasterdetailmap {
    constructor(public maindetailmapid: number, public maintableid: number, public detailtableid: number, public detailtableidDesc: string, public status: string) { }
}
export interface IbotablemasterdetailmapResponse {
    total: number;
    results: botablemasterdetailmap[];
}

