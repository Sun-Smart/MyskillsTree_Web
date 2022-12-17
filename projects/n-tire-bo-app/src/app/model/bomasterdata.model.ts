export class bomasterdata {
public masterdataiddesc :string;public masterdataid :number;public masterdatatypeid :number;public masterdatatypeiddesc :string;public masterdatacode :string;public masterdatadescription :string;public orderno :number;public htmlcode :string;public param1 :string;public param2 :string;public helptext :string;public flag :string;public status :string;public DeletedbosubcategorymasterIDs :string;
constructor() {}
}
export interface IbomasterdataResponse {
total: number;
results: bomasterdata[];
}

