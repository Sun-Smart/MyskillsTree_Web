export class bonotifier {
public notifieriddesc :string;public notifierid :number;public sourcefield :string;public sourcereference :number;public notifieruserid :number;public notifieruseriddesc :string;public status :string;
constructor() {}
}
export interface IbonotifierResponse {
total: number;
results: bonotifier[];
}

