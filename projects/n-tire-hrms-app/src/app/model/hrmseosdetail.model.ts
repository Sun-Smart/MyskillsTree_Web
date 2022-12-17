export class hrmseosdetail {
public eosid :number;public detailiddesc :string;public detailid :number;public basedon :string;public basedondesc :string;public fromdays :number;public todays :number;public forevery :number;public startfromjoin :boolean;public mode :string;public modedesc :string;public type :string;public typedesc :string;public typevalue :string;public status :string;
constructor() {}
}
export interface IhrmseosdetailResponse {
total: number;
results: hrmseosdetail[];
}

