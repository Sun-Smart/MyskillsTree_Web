export class pmspropertycontact {
public contactiddesc :string;public contactid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public contacttype :string;public contacttypedesc :string;public contactname :string;public mobile :string;public email :string;public remarks :string;public status :string;
constructor() {}
}
export interface IpmspropertycontactResponse {
total: number;
results: pmspropertycontact[];
}

