export class bousermenuaccess {
    public usermenuaccessiddesc: string; public usermenuaccessid: number; public userid: number; public menuid: number; public status: string;
    constructor() { }
}
export interface IbousermenuaccessResponse {
    total: number;
    results: bousermenuaccess[];
}

