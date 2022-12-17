export class hrmsemployeestationaryrequest {
public stationaryrequestiddesc :string;public stationaryrequestid :number;public employeeid :number;public stationaryrequestcode :string;public requestdate :Date;public category :number;public categorydesc :string;public subcategory :number;public subcategorydesc :string;public requiredbefore :Date;public requiredquantity :number;public remarks :string;public issuedate :Date;public issuequantity :number;public status :string;
constructor() {}
}
export interface IhrmsemployeestationaryrequestResponse {
total: number;
results: hrmsemployeestationaryrequest[];
}

