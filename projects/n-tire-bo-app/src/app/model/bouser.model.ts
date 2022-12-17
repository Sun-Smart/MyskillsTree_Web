export class bouser {
public sourceuseriddesc :string;public sourceuserid :number;public sourcefield :string;public sourcereference :number;public userid :number;public status :string;
constructor() {}
}
export interface IbouserResponse {
total: number;
results: bouser[];
}

