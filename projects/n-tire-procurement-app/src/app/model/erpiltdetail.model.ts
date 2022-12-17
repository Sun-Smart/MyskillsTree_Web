export class erpiltdetail {
public iltid :number;public iltiddesc :string;public iltdetailiddesc :string;public iltdetailid :number;public frombranch :number;public frombranchdesc :string;public frombranchuserid :number;public frombranchuseriddesc :string;public tobranch :number;public tobranchdesc :string;public tobranchuserid :number;public tobranchuseriddesc :string;public itemid :number;public itemiddesc :string;public uom :string;public uomdesc :string;public quantity :string;public status :string;
constructor() {}
}
export interface IerpiltdetailResponse {
total: number;
results: erpiltdetail[];
}

