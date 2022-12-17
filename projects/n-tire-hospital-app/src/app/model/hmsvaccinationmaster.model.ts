export class hmsvaccinationmaster {
    public vaccinationid: number; public vaccinationname: string; public frequency: number; public frequencyunit: string; public frequencyunitdesc: string; public deviationpercentage: number; public priority: string; public prioritydesc: string; public remindertype: string; public remindertypedesc: string; public templateid: number; public status: string;
    constructor() { }
}
export interface IhmsvaccinationmasterResponse {
    total: number;
    results: hmsvaccinationmaster[];
}

