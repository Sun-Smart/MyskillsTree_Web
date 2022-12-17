export class hrmsgrademasters {
    public gradeiddesc: string; public gradeid: number; public description: string; public gradeband: string; public gradenumber: string; public status: string;
    constructor() { }
}
export interface IhrmsgrademastersResponse {
    total: number;
    results: hrmsgrademasters[];
}

