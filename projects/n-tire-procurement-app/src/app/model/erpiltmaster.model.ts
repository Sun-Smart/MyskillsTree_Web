export class erpiltmaster {
public branchid :number;public branchiddesc :string;public iltiddesc :string;public iltid :number;public ildcode :string;public iltdate :Date;public ilttime :string;public reference :string;public inspectionrequired :boolean;public ilttype :string;public ilttypedesc :string;public criticality :string;public criticalitydesc :string;public iltremarks :string;public tobranch :number;public tobranchdesc :string;public tobranchuserid :number;public tobranchuseriddesc :string;public expectedtransferdate :Date;public expectedtransfertime :string;public transportationdetails :string;public transferreruserid :number;public transferreruseriddesc :string;public actualtransferdate :Date;public actualtransfertime :string;public receiveruserid :number;public receiveruseriddesc :string;public receiveddate :Date;public receivedtime :string;public remarks :string;public status :string;public customfield :string;public attachment :string;public DeletederpiltdetailIDs :string;
constructor() {}
}
export interface IerpiltmasterResponse {
total: number;
results: erpiltmaster[];
}

