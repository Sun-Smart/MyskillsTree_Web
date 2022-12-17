export class erpproductpricehistory {
public priceiddesc :string;public priceid :number;public branchid :number;public branchiddesc :string;public productid :number;public productiddesc :string;public pricedate :Date;public price :number;public offerquantity1 :number;public unitprice1 :number;public totalcost1 :number;public offerquantity2 :number;public unitprice2 :number;public totalcost2 :number;public offerquantity3 :number;public unitprice3 :number;public totalcost3 :number;public status :string;
constructor() {}
}
export interface IerpproductpricehistoryResponse {
total: number;
results: erpproductpricehistory[];
}

