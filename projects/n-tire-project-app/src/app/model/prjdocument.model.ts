export class prjdocument {
    public documentiddesc: string; public documentid: number; public projectid: number; public projectiddesc: string; public documentname: string; public description: string; public category: string; public categorydesc: string; public preparedby: string; public docaccess: string; public url: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjdocumentResponse {
    total: number;
    results: prjdocument[];
}

