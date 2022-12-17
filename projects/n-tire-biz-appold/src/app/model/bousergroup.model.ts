export class bousergroup {
    public usergroupiddesc: string; public usergroupid: number; public groupname: string; public notes: string; public customfield: string; public attachment: string; public status: string; public Deleted_bousergroupaccess_IDs: string;
    constructor() { }
}
export interface IbousergroupResponse {
    total: number;
    results: bousergroup[];
}

