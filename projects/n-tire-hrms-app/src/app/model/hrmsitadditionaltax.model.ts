export class hrmsitadditionaltax {
public ataxiddesc :string;public ataxid :number;public name :string;public percentage :number;public taxortaxableincome :string;public taxortaxableincomedesc :string;public status :string;
constructor() {}
}
export interface IhrmsitadditionaltaxResponse {
total: number;
results: hrmsitadditionaltax[];
}

