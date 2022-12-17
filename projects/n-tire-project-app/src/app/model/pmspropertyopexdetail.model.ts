export class pmspropertyopexdetail {
public opexiddesc :string;public opexid :number;public propertyid :number;public opexname :string;public frequencydays :number;public currency :string;public currencydesc :string;public amount :number;public status :string;
constructor() {}
}
export interface IpmspropertyopexdetailResponse {
total: number;
results: pmspropertyopexdetail[];
}

