export class hrmseosrole {
public eosid :number;public eosroleiddesc :string;public eosroleid :number;public roleid :number;public roleiddesc :string;public status :string;
constructor() {}
}
export interface IhrmseosroleResponse {
total: number;
results: hrmseosrole[];
}

