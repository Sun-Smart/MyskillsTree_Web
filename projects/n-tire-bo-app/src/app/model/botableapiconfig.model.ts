export class botableapiconfig {
    constructor(public tableapiid: number, public tableconfigid: number, public usertype: number, public apiname: string, public apivalue: string, public apitext: string, public apitype: number, public apitypeDesc: string, public status: string) { }
}
export interface IbotableapiconfigResponse {
    total: number;
    results: botableapiconfig[];
}

