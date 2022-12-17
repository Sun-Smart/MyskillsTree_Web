export class erptendersupplierresponsedetail {
public responsedetailiddesc :string;public responsedetailid :number;public responseid :number;public responseiddesc :string;public tenderdetailid :number;public tenderdetailiddesc :string;public tenderid :number;public itemid :number;public itemiddesc :string;public description :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public unitprice :string;public cost :number;public totalvalue :number;public status :string;
constructor() {}
}
export interface IerptendersupplierresponsedetailResponse {
total: number;
results: erptendersupplierresponsedetail[];
}

