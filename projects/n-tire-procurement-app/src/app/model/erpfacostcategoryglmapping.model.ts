export class erpfacostcategoryglmapping {
    public mapid: number; public ccid: number; public cciddesc: string; public glid: number; public gliddesc: string; public status: string;
    constructor() { }
}
export interface IerpfacostcategoryglmappingResponse {
    total: number;
    results: erpfacostcategoryglmapping[];
}

