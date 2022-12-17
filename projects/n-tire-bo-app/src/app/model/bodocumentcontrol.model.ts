export class bodocumentcontrol {
public controliddesc :string;public controlid :number;public documentid :number;public documentiddesc :string;public sourcefield :string;public sourcereference :number;public action :string;public actiondesc :string;public userid :number;public useriddesc :string;public actiondatetime :Date;public status :string;
constructor() {}
}
export interface IbodocumentcontrolResponse {
total: number;
results: bodocumentcontrol[];
}

