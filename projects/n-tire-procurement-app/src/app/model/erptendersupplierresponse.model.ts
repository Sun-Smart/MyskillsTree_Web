export class erptendersupplierresponse {
public responseiddesc :string;public responseid :number;public tenderid :number;public tenderiddesc :string;public supplierid :number;public supplieriddesc :string;public submitdatetime :Date;public documentfeepaid :boolean;public emdpaid :boolean;public bidamount :number;public supplierreference :string;public customfield :string;public attachment :string;public agreed :boolean;public status :string;public DeletederptendersuppliercomplianceresponseIDs :string;public DeletederptendersupplierresponsedetailIDs :string;
constructor() {}
}
export interface IerptendersupplierresponseResponse {
total: number;
results: erptendersupplierresponse[];
}

