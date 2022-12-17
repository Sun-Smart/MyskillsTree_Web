export class erpmaterialrequestdetail {
public mrsid :number;public mrsiddesc :string;public mrsdetailiddesc :string;public mrsdetailid :number;public itemcategory :number;public itemcategorydesc :string;public itemsubcategory :number;public itemsubcategorydesc :string;public itemid :number;public itemiddesc :string;public itemdescription :string;public quantity :string;public uom :string;public uomdesc :string;public warehouseid :number;public warehouseiddesc :string;public itemcost :number;public supplierid :number;public supplieriddesc :string;public mrsremarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpmaterialrequestdetailResponse {
total: number;
results: erpmaterialrequestdetail[];
}

