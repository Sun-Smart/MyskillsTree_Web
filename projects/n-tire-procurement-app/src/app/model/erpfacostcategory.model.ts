export class erpfacostcategory {
    public ccid: number; public cccode: string; public ccname: string; public budget: number; public status: string; public DeletederpfacostcenterIDs: string;
    constructor() { }
}
export interface IerpfacostcategoryResponse {
    total: number;
    results: erpfacostcategory[];
}

