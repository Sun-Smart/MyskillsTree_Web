export class erpsupplieritemfeature {
public supplierid :number;public supplieriddesc :string;public supplieritemid :number;public supplieritemiddesc :string;public featureiddesc :string;public featureid :number;public featurename :string;public value :string;public status :string;
constructor() {}
}
export interface IerpsupplieritemfeatureResponse {
total: number;
results: erpsupplieritemfeature[];
}

