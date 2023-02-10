export class bokbmaster {
    public kbiddesc: string; public kbid: number; public kbcode: string; public kbsubject: string; public kbcategory: number; public kbcategorydesc: string; public kbsubcategory: number; public kbsubcategorydesc: string; public tags: string; public icon: string; public icondesc: string; public summary: string; public kbdetails: string; public markpublic: boolean; public author: number; public authordesc: string; public publisheddate: Date; public expirationdate: Date; public language: string; public languagedesc: string; public rating: number; public comments: string; public kbaccess: any[]; public kbaccessdesc: string; public kbaccessstring: string; public customfield: string; public attachment: string; public status: string; public Deleted_bokbtopic_IDs: string;
    constructor() { }
}
export interface IbokbmasterResponse {
    total: number;
    results: bokbmaster[];
}

