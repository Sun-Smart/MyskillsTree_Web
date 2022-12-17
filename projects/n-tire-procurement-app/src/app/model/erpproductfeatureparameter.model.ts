export class erpproductfeatureparameter {
public epfpiddesc :string;public epfpid :number;public featurename :string;public productid :number;public productiddesc :string;public itemcategoryid :number;public itemcategoryiddesc :string;public itemsubcategoryid :number;public itemsubcategoryiddesc :string;public customfieldid :number;public customfieldiddesc :string;public status :string;
constructor() {}
}
export interface IerpproductfeatureparameterResponse {
total: number;
results: erpproductfeatureparameter[];
}

