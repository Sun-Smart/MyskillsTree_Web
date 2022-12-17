export class bouserrolemaster {
    public userroleiddesc: string; public userroleid: number; public userrole: string; public additionalnotes: string; public status: string; public Deleted_bousertypemenuaccess_IDs: string;
    constructor() { }
}
export interface IbouserrolemasterResponse {
    total: number;
    results: bouserrolemaster[];
}

