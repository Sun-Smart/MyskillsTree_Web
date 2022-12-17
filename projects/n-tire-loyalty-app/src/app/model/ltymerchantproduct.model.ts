export class ltymerchantproduct {
public merchantproductiddesc :string;public merchantproductid :number;public merchantid :number;public merchantiddesc :string;public productid :number;public productiddesc :string;public setupfee :number;public servicefee :number;public pertransactionfee :number;public status :string;
constructor() {}
}
export interface IltymerchantproductResponse {
total: number;
results: ltymerchantproduct[];
}

