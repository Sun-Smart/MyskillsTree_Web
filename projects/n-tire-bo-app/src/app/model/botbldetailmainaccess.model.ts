export class botbldetailmainaccess {
    constructor(public maindetailaccessid: number, public tableconfigid: number, public usertype: number, public showdetailtableid: number, public status: string) { }
}
export interface IbotbldetailmainaccessResponse {
    total: number;
    results: botbldetailmainaccess[];
}

