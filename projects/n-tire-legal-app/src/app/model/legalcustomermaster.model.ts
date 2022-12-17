export class legalcustomermaster {
public branchid :number;public branchiddesc :string;public customeriddesc :string;public customerid :number;public customercode :string;public customername :string;public thumbnail :string;public customertypeid :number;public customertypeiddesc :string;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public groupname :string;public groupnamedesc :string;public website :string;public phone :string;public mobilenumber :string;public emailid :string;public address :string;public customfield :string;public attachment :string;public status :string;public DeletedbocontactIDs :string;public DeletedlegalopponentmasterIDs :string;
constructor() {}
}
export interface IlegalcustomermasterResponse {
total: number;
results: legalcustomermaster[];
}

