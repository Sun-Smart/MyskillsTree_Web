export class erpsupplierreference {
public esriddesc :string;public esrid :number;public supplierid :number;public supplieriddesc :string;public customername :string;public companytype :string;public companytypedesc :string;public relationshipdetails :string;public effectivefrom :Date;public referencedetails :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpsupplierreferenceResponse {
total: number;
results: erpsupplierreference[];
}

