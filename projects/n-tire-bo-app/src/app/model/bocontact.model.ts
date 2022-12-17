export class bocontact {
public contactiddesc :string;public contactid :number;public referencetype :string;public referencetypedesc :string;public referenceid :number;public contacttype :string;public contacttypedesc :string;public firstname :string;public lastname :string;public title :string;public activefromdate :Date;public activetodate :Date;public department :string;public category :string;public categorydesc :string;public phone :string;public donotcall :boolean;public email1 :string;public email2 :string;public assignedto :string;public sourcefield :string;public sourcereference :number;public status :string;
constructor() {}
}
export interface IbocontactResponse {
total: number;
results: bocontact[];
}

