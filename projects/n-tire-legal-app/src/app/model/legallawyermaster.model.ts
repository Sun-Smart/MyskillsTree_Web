export class legallawyermaster {
public lawyeriddesc :string;public lawyerid :number;public lawyercode :string;public lawyername :string;public lawyertype :string;public lawyertypedesc :string;public lawyercompany :string;public branchid :number;public branchiddesc :string;public roleid :number;public roleiddesc :string;public gender :string;public genderdesc :string;public dob :Date;public mobilenumber :string;public emailid :string;public alternatenumber :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pin :string;public validfromdate :Date;public validtodate :Date;public bankname :string;public iban :string;public accountnumber :string;public accountname :string;public bankotherdetails :string;public customfield :string;public attachment :string;public status :string;public DeletedlegallawyercourtIDs :string;
constructor() {}
}
export interface IlegallawyermasterResponse {
total: number;
results: legallawyermaster[];
}

