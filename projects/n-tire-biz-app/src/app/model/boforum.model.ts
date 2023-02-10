export class boforum {
    public forumiddesc: string; public forumid: number; public title: string; public description: string; public forumtype: string; public forumtypedesc: string; public comments: string; public forumaccess: any[]; public forumaccessdesc: string; public forumaccessstring: string; public forumstatus: string; public forumstatusdesc: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IboforumResponse {
    total: number;
    results: boforum[];
}

