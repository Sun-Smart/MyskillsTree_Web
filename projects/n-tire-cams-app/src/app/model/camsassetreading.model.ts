export class camsassetreading {
public readingiddesc :string;public readingid :number;public assetid :number;public assetiddesc :string;public readingpointcode :string;public readingpointcodedesc :string;public readingpoint :string;public readingtype :string;public readingtypedesc :string;public measurementmeter :string;public measurementmeterdesc :string;public readingdate :Date;public reading :number;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsassetreadingResponse {
total: number;
results: camsassetreading[];
}

