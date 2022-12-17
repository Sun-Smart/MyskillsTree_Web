export class bodynamicform {
    public tableid: number; public tableiddesc: string; public conditionfield: string; public conditionvalue: string; public formiddesc: string; public formid: number; public formname: string; public formtype: string; public formtypedesc: string; public formhtml: string; public cols: number; public templatehtml: string; public hasattachments: boolean; public sequence: number; public status: string; public Deleted_bodynamicformdetail_IDs: string;
    constructor() { }
}
export interface IbodynamicformResponse {
    total: number;
    results: bodynamicform[];
}

