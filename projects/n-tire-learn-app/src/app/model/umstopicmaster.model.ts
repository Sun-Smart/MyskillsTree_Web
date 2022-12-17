export class umstopicmaster {
    public topicid: number; public topiccode: string; public description: string; public hours: number; public kbcategory: number; public kbcategorydesc: string; public kbsubcategory: number; public kbsubcategorydesc: string; public kbid: number; public kbiddesc: string; public customfield: string; public attachment: string; public status: string; public DeletedumsquestionIDs: string;
    constructor() { }
}
export interface IumstopicmasterResponse {
    total: number;
    results: umstopicmaster[];
}

