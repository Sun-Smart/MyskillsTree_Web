export class prjprojectuser {
    public projectuserid: number; public projectid: number; public userid: number; public status: string;
    constructor() { }
}
export interface IprjprojectuserResponse {
    total: number;
    results: prjprojectuser[];
}

