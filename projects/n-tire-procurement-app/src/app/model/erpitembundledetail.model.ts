export class erpitembundledetail {
public bundledetailiddesc :string;public bundledetailid :number;public bundleid :number;public bundleiddesc :string;public itemid :number;public itemiddesc :string;public description :string;public quantity :number;public uom :string;public uomdesc :string;public status :string;
constructor() {}
}
export interface IerpitembundledetailResponse {
total: number;
results: erpitembundledetail[];
}

