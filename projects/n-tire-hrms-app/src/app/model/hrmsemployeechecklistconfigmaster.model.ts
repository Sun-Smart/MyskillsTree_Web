export class hrmsemployeechecklistconfigmaster {
public checkiddesc :string;public checkid :number;public documentcategory :number;public documentcategorydesc :string;public documentname :string;public original :boolean;public quantity :number;public maximumdays :number;public mandatory :boolean;public waiverdays :number;public status :string;
constructor() {}
}
export interface IhrmsemployeechecklistconfigmasterResponse {
total: number;
results: hrmsemployeechecklistconfigmaster[];
}

