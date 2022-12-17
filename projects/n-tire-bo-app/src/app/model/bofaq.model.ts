export class bofaq {
public faqiddesc :string;public faqid :number;public sourcefield :string;public sourcefielddesc :string;public sourcereference :number;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public question :string;public answer :string;public status :string;
constructor() {}
}
export interface IbofaqResponse {
total: number;
results: bofaq[];
}

