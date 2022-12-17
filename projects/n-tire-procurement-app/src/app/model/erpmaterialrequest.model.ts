export class erpmaterialrequest {
public branchid :number;public branchiddesc :string;public mrsiddesc :string;public mrsid :number;public mrscode :string;public mrsdate :Date;public mrstime :string;public reference :string;public requesttype :string;public requesttypedesc :string;public requestoruserid :number;public requestoruseriddesc :string;public requestorname :string;public phonenumber :string;public departmentid :number;public departmentiddesc :string;public materialrequireddate :Date;public materialrequiredtime :string;public reasoncategory :string;public reasoncategorydesc :string;public criticality :string;public criticalitydesc :string;public storelocationid :number;public storelocationiddesc :string;public instructions :string;public mrsremarks :string;public projectid :number;public projectiddesc :string;public termid :number;public termiddesc :string;public terms :string;public customfield :string;public attachment :string;public costcenterid :number;public costcenteriddesc :string;public processingstarttime :Date;public processingendtime :Date;public status :string;public DeletederpmaterialrequestdetailIDs :string;
constructor() {}
}
export interface IerpmaterialrequestResponse {
total: number;
results: erpmaterialrequest[];
}

