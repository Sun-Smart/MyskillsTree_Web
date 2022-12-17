export class pmspropertyasset {
public propertyassetiddesc :string;public propertyassetid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public assetid :number;public assetiddesc :string;public attacheddate :Date;public removeddate :Date;public status :string;
constructor() {}
}
export interface IpmspropertyassetResponse {
total: number;
results: pmspropertyasset[];
}

