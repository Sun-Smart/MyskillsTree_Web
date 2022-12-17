export class bomasterdatatype {
public datatypeiddesc :string;public datatypeid :number;public code :string;public codedesc :string;public masterdataname :string;public hassubcategory :boolean;public canadd :boolean;public canedit :boolean;public candelete :boolean;public erp :boolean;public cams :boolean;public crm :boolean;public procurement :boolean;public legal :boolean;public hrms :boolean;public status :string;public DeletedbomasterdataIDs :string;
constructor() {}
}
export interface IbomasterdatatypeResponse {
total: number;
results: bomasterdatatype[];
}

