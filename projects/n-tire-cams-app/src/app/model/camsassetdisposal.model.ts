export class camsassetdisposal {
public branchid :number;public disposaliddesc :string;public disposalid :number;public disposalplanid :number;public disposalplaniddesc :string;public assetid :number;public assetiddesc :string;public assetgroup :number;public assetdescription :string;public assetreference :string;public cost :string;public disposalmethod :string;public disposalmethoddesc :string;public disposedby :number;public disposedbydesc :string;public disposaldate :Date;public accountdate :Date;public disposalamount :number;public disposedreason :string;public disposedreasondesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsassetdisposalResponse {
total: number;
results: camsassetdisposal[];
}

