export class bosubcategorymaster {
    public subcategoryiddesc: string; public subcategoryid: number; public categoryid: number; public subcategoryname: string; public orderno: number; public status: string;
    constructor() { }
}
export interface IbosubcategorymasterResponse {
    total: number;
    results: bosubcategorymaster[];
}

