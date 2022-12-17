export class camsassetdisposalplan {
public branchid :number;public disposalplaniddesc :string;public disposalplanid :number;public reference :string;public details :string;public preparedby :number;public preparedbydesc :string;public prepareddate :Date;public disposaldate :Date;public disposalmethod :string;public disposalmethoddesc :string;public approvedby :number;public verifiedby :number;public remarks :string;public customfield :string;public attachment :string;public status :string;public DeletedcamsassetdisposalIDs :string;
constructor() {}
}
export interface IcamsassetdisposalplanResponse {
total: number;
results: camsassetdisposalplan[];
}

