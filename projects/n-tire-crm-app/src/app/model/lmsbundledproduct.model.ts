export class lmsbundledproduct {
public productid :number;public bundleproductiddesc :string;public bundleproductid :number;public status :string;
constructor() {}
}
export interface IlmsbundledproductResponse {
total: number;
results: lmsbundledproduct[];
}

