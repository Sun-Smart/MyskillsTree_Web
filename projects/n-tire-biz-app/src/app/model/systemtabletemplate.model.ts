export class systemtabletemplate {
    public tabledetailiddesc: string; public tabledetailid: number; public tableid: number; public userroleid: number; public userroleiddesc: string; public viewhtml: string; public templatehtml: string; public visiblefields: string; public hidefields: string; public status: string;
    constructor() { }
}
export interface IsystemtabletemplateResponse {
    total: number;
    results: systemtabletemplate[];
}

