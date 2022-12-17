export class bousergroup {
public usergroupiddesc :string;public usergroupid :number;public groupname :string;public notes :string;public customfield :string;public attachment :string;public status :string;public DeletedbousergroupaccessIDs :string;
constructor() {}
}
export interface IbousergroupResponse {
total: number;
results: bousergroup[];
}

