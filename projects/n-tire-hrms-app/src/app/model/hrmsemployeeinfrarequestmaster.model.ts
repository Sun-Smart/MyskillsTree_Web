export class hrmsemployeeinfrarequestmaster {
public infrarequestiddesc :string;public infrarequestid :number;public employeeid :number;public infrarequestcode :string;public requestdate :Date;public assetcategory :number;public assetcategorydesc :string;public assetsubcategory :number;public assetsubcategorydesc :string;public requiredbefore :Date;public remarks :string;public issuedate :Date;public assetreference :string;public returndate :Date;public returncondition :string;public returnconditiondesc :string;public returnclaim :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeinfrarequestmasterResponse {
total: number;
results: hrmsemployeeinfrarequestmaster[];
}

