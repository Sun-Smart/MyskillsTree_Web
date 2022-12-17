export class pmspropertyimage {
public photoiddesc :string;public photoid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public description :string;public attachment :string;public status :string;
constructor() {}
}
export interface IpmspropertyimageResponse {
total: number;
results: pmspropertyimage[];
}

