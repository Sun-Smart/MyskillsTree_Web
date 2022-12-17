export class camsassetreadinghistory {
public historyiddesc :string;public historyid :number;public readingid :number;public assetid :number;public assetiddesc :string;public readingpointcode :string;public readingpointcodedesc :string;public readingtype :string;public readingtypedesc :string;public measurementmeter :string;public measurementmeterdesc :string;public readingdate :Date;public reading :number;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsassetreadinghistoryResponse {
total: number;
results: camsassetreadinghistory[];
}

