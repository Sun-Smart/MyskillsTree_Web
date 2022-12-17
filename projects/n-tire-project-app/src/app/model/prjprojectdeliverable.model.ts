export class prjprojectdeliverable {
public projectid :number;public deliverableiddesc :string;public deliverableid :number;public deliverablename :string;public targetshare :number;public targetdate :Date;public sequence :number;public notes :string;public customfield :string;public attachment :string;public status :string;public draft :boolean;public DeletedprjprojecttaskIDs :string;public DeletedbofactIDs :string;
constructor() {}
}
export interface IprjprojectdeliverableResponse {
total: number;
results: prjprojectdeliverable[];
}

