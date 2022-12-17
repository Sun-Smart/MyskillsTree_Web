export class dmsdocumentfield {
public propertyiddesc :string;public propertyid :number;public documentid :number;public documentiddesc :string;public propertyname :string;public value :string;public status :string;
constructor() {}
}
export interface IdmsdocumentfieldResponse {
total: number;
results: dmsdocumentfield[];
}

