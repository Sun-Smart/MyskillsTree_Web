export class erpbudgetmaster {
public budgetiddesc :string;public budgetid :number;public budgetname :string;public branchid :number;public branchiddesc :string;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public finyear :number;public finyeardesc :string;public currency :string;public controltype :string;public controltypedesc :string;public budgetstartdate :Date;public multiplicationfactor :number;public accountid :number;public accountiddesc :string;public periodrange :string;public periodrangedesc :string;public yearlybudgetamount :number;public halfyearlybudgetamount1 :number;public halfyearlybudgetamount2 :number;public quaterlyyearlybudgetamount1 :number;public quaterlyyearlybudgetamount2 :number;public quaterlyyearlybudgetamount3 :number;public quaterlyyearlybudgetamount4 :number;public monthlyyearlybudgetamount1 :number;public monthlyyearlybudgetamount2 :number;public monthlyyearlybudgetamount3 :number;public monthlyyearlybudgetamount4 :number;public monthlyyearlybudgetamount5 :number;public monthlyyearlybudgetamount6 :number;public monthlyyearlybudgetamount7 :number;public monthlyyearlybudgetamount8 :number;public monthlyyearlybudgetamount9 :number;public monthlyyearlybudgetamount10 :number;public monthlyyearlybudgetamount11 :number;public monthlyyearlybudgetamount12 :number;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpbudgetmasterResponse {
total: number;
results: erpbudgetmaster[];
}

