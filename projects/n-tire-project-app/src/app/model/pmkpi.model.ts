export class pmkpi {
    public kpiid: number; public code: string; public name: string; public description: string; public category: string; public categorydesc: string; public type: string; public typedesc: string; public departmentid: number; public departmentiddesc: string; public designationid: string; public designationiddesc: string; public frequency: string; public frequencydesc: string; public target: string; public format: string; public formatdesc: string; public weight: number; public measures: string; public reviewquestions: string; public redmaxscore: number; public ambermaxscore: number; public greenmaxscore: number; public status: string;
    constructor() { }
}
export interface IpmkpiResponse {
    total: number;
    results: pmkpi[];
}

