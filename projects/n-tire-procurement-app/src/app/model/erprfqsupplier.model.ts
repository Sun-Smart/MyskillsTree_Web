export class erprfqsupplier {
public rfqitemsupplieriddesc :string;public rfqitemsupplierid :number;public rfqid :number;public rfqiddesc :string;public rfqdetailid :number;public rfqdetailiddesc :string;public itemid :number;public itemdescription :string;public uom :string;public quantity :string;public requiredbefore :Date;public supplierid :number;public supplieriddesc :string;public contact :string;public notes :string;public supplierquoteid :number;public status :string;
constructor() {}
}
export interface IerprfqsupplierResponse {
total: number;
results: erprfqsupplier[];
}

