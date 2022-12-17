export class camsassetcosts {
public costiddesc :string;public costid :number;public costtype :string;public costtypedesc :string;public cost :number;public taskcompleted :boolean;public party :string;public status :string;
constructor() {}
}
export interface IcamsassetcostsResponse {
total: number;
results: camsassetcosts[];
}

