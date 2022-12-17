export class erpregisteredsupplierproductcategory {
public supplierproductcategoryiddesc :string;public supplierproductcategoryid :number;public registrationid :number;public registrationiddesc :string;public productcategory :string;public productcategorydesc :string;public status :string;
constructor() {}
}
export interface IerpregisteredsupplierproductcategoryResponse {
total: number;
results: erpregisteredsupplierproductcategory[];
}

