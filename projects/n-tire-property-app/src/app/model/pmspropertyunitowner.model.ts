export class pmspropertyunitowner {
public propertyowneriddesc :string;public propertyownerid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public ownerid :number;public owneriddesc :string;public ownership :number;public status :string;
constructor() {}
}
export interface IpmspropertyunitownerResponse {
total: number;
results: pmspropertyunitowner[];
}

