export class erpitembundle {
public bundleiddesc :string;public bundleid :number;public code :string;public description :string;public status :string;public DeletederpitembundledetailIDs :string;
constructor() {}
}
export interface IerpitembundleResponse {
total: number;
results: erpitembundle[];
}

