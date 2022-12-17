export class boserialkeyparameter {
public serialkeyiddesc :string;public serialkeyid :number;public tablename :string;public columnname :string;public serialkeylogic :string;public status :string;
constructor() {}
}
export interface IboserialkeyparameterResponse {
total: number;
results: boserialkeyparameter[];
}

