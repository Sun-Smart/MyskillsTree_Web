export class hrmsemployerchecklistconfigmaster {
public echeckiddesc :string;public echeckid :number;public documentcategory :number;public documentcategorydesc :string;public documentname :string;public original :boolean;public quantity :number;public maximumdays :number;public mandatory :boolean;public waiverdays :number;public status :string;
constructor() {}
}
export interface IhrmsemployerchecklistconfigmasterResponse {
total: number;
results: hrmsemployerchecklistconfigmaster[];
}

