export class bosubconfigvalue {
    public subcategoryiddesc: string; public subcategoryid: number; public configkey: string; public configkeydesc: string; public subconfigcode: string; public subconfigcodedesc: string; public subcategoryname: string; public orderno: number; public status: string;
    constructor() { }
}
export interface IbosubconfigvalueResponse {
    total: number;
    results: bosubconfigvalue[];
}

