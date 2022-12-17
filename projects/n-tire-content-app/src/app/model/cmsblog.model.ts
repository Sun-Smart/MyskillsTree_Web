export class cmsblog {
    public blogid: number; public title: string; public body: string; public image: string; public tags: string; public enablecomments: boolean; public enablenotifications: boolean; public makevisible: boolean; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcmsblogResponse {
    total: number;
    results: cmsblog[];
}

