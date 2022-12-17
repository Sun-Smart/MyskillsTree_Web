export class itasset {
public assetiddesc :string;public assetid :number;public assetcode :string;public assetname :string;public supplierid :number;public productid :number;public purchasecost :number;public tags :string;public acquisitiondate :Date;public serialnumber :string;public expirydate :Date;public barcode :string;public warrantyexpirydate :Date;public locationid :number;public assetstatus :string;public assetstatusdesc :string;public comments :string;public attachment :string;public status :string;public DeleteditassetmobiledetailIDs :string;public DeleteditassetconfigdetailIDs :string;public DeleteditassetnetworkdetailIDs :string;
constructor() {}
}
export interface IitassetResponse {
total: number;
results: itasset[];
}

