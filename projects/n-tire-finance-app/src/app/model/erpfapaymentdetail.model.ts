export class erpfapaymentdetail {
public paymentdetailiddesc :string;public paymentdetailid :number;public paymentid :number;public paymentdetails :string;public sourcefield :string;public voucherid :number;public voucherreference :string;public voucherdate :Date;public voucheramount :number;public paid :string;public balance :string;public narration :string;public status :string;
constructor() {}
}
export interface IerpfapaymentdetailResponse {
total: number;
results: erpfapaymentdetail[];
}

