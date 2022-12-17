export class mstprofilecompletionmaster {
    public profileiddesc: string; public profileid: number; public generalinformation: number; public education: number; public career: number; public skill: number; public photo: number; public language: number; public geography: number; public achievements: number; public displayprofile: number; public statuscrimp: number; public reference: number; public worksdone: number; public socialmedia: number; public status: string;
    constructor() { }
}
export interface ImstprofilecompletionmasterResponse {
    total: number;
    results: mstprofilecompletionmaster[];
}

