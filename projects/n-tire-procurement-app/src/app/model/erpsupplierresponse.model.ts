export class erpsupplierresponse {
public responseiddesc :string;public responseid :number;public responsedate :Date;public supplierid :number;public supplieriddesc :string;public supplieritemid :number;public deliverydate :Date;public remarks :string;public status :string;public parentid :number;
constructor() {}
}
export interface IerpsupplierresponseResponse {
total: number;
results: erpsupplierresponse[];
}

