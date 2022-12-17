export class hrmseosmaster {
public eosddesc :string;public eosd :number;public eoscode :string;public eosname :string;public status :string;public DeletedhrmseosroleIDs :string;public DeletedhrmseosdetailIDs :string;
constructor() {}
}
export interface IhrmseosmasterResponse {
total: number;
results: hrmseosmaster[];
}

