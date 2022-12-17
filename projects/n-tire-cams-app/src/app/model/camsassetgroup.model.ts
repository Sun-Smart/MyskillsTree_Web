export class camsassetgroup {
public assetgroupiddesc :string;public assetgroupid :number;public code :string;public description :string;public owned :boolean;public uom :string;public uomdesc :string;public category :string;public categorydesc :string;public subcategory :string;public subcategorydesc :string;public depreciate :boolean;public depreciationtype :string;public depreciationtypedesc :string;public frequencyofdepreciation :number;public maxdepreciations :number;public depreciationpercentage :number;public postingdate :Date;public isfixedasset :boolean;public oneassetperuom :boolean;public usablelifeyears :number;public usablelifemonths :number;public uselifeyears :number;public uselifemonths :number;public assetaccount :number;public assetaccountdesc :string;public maintenanceaccount :number;public maintenanceaccountdesc :string;public leasecostaccount :number;public leasecostaccountdesc :string;public disposallossaccount :number;public disposallossaccountdesc :string;public disposalgainaccount :number;public disposalgainaccountdesc :string;public depreciationaccount :number;public depreciationaccountdesc :string;public accumdepreciationaccount :number;public accumdepreciationaccountdesc :string;public capitalwipaccount :number;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsassetgroupResponse {
total: number;
results: camsassetgroup[];
}

