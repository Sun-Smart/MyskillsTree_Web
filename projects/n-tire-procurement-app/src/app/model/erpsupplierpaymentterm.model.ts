export class erpsupplierpaymentterm {
public supplierid :number;public supplieriddesc :string;public supplieritemid :number;public supplieritemiddesc :string;public supplierpaytermiddesc :string;public supplierpaytermid :number;public paymenttermtype :string;public paymenttermtypedesc :string;public percentage :string;public description :string;public status :string;
constructor() {}
}
export interface IerpsupplierpaymenttermResponse {
total: number;
results: erpsupplierpaymentterm[];
}

