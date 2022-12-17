export class proprocessgap {
public gapiddesc :string;public gapid :number;public sourcefield :string;public sourcereference :number;public reference :string;public processowner :number;public process :number;public processstep :number;public currentresult :string;public currentresultdesc :string;public desiredresult :string;public desiredresultdesc :string;public actionitems :string;public targetdate :Date;public notes :string;public status :string;
constructor() {}
}
export interface IproprocessgapResponse {
total: number;
results: proprocessgap[];
}

