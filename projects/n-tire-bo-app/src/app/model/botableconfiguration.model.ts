export class botableconfiguration {
    constructor(public tableconfigid: number, public templateid: number, public description: string, public company: number, public listhtml: string, public maintableid: number, public maintableidDesc: string, public type: number, public usertype: number, public addrecord: boolean, public editrecord: boolean, public viewrecord: boolean, public deleterecord: boolean, public hasheader: boolean, public hascontent: boolean, public hasfooter: boolean, public headerheight: number, public contentheight: number, public footerheight: number, public columnlist: string, public tablestyletype: number, public remarks: string, public status: string, public DeletedbotbldetailmainaccessIDs: string) { }
}
export interface IbotableconfigurationResponse {
    total: number;
    results: botableconfiguration[];
}

