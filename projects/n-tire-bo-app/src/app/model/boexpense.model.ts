export class boexpense {
public expenseiddesc :string;public expenseid :number;public sourcefield :string;public sourcereference :number;public expensedate :Date;public requesteduserid :number;public requesteduseriddesc :string;public expensetype :string;public expensetypedesc :string;public expensecategory :string;public expensecategorydesc :string;public expensedescription :string;public currency :string;public currencydesc :string;public amount :number;public tax :number;public othercharges :number;public totalamount :number;public merchant :string;public receiptattached :boolean;public billable :boolean;public reimbursedamount :number;public reimburseddate :Date;public referencenumber :string;public basecurrency :string;public basecurrencydesc :string;public baseamount :number;public notes :string;public costcenterid :number;public costcenteriddesc :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IboexpenseResponse {
total: number;
results: boexpense[];
}

