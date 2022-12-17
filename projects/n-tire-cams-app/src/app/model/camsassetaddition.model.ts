export class camsassetaddition {
public additioniddesc :string;public additionid :number;public assetid :number;public assetiddesc :string;public currentdate :Date;public addedby :number;public addedbydesc :string;public additiondate :Date;public accountdate :Date;public amount :number;public addedservicelife :boolean;public addedshelflife :boolean;public addedreason :string;public addedreasondesc :string;public barcode :string;public itemid :number;public itemiddesc :string;public description :string;public acquisitionmethod :string;public acquisitionmethoddesc :string;public serialnumber :string;public expirydate :Date;public uom :string;public uomdesc :string;public quantity :number;public notes :string;public poid :number;public poiddesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsassetadditionResponse {
total: number;
results: camsassetaddition[];
}

