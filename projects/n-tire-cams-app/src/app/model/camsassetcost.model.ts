export class camsassetcost {
public costiddesc :string;public costid :number;public assetid :number;public assetiddesc :string;public costtype :string;public costtypedesc :string;public cost :number;public taskcompleted :boolean;public party :string;public status :string;
constructor() {}
}
export interface IcamsassetcostResponse {
total: number;
results: camsassetcost[];
}

