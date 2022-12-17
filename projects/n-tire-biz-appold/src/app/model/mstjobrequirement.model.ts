export class mstjobrequirement {
    public jobiddesc: string; public jobid: number; public corporateid: number; public jobdescription: string; public jobrequirement: string; public numberofpositions: number; public tobefilledbefore: Date; public experiencefrom: number; public experienceto: number; public locations: number; public locationsstring: string; public skills: number; public skillsstring: string; public education: number; public educationstring: string; public language: string; public languagestring: string; public referenceavailability: boolean; public referencevalidation: boolean; public attachment: string; public status: string; public Deleted_mstjobstatus_IDs: string;
    constructor() { }
}
export interface ImstjobrequirementResponse {
    total: number;
    results: mstjobrequirement[];
}

