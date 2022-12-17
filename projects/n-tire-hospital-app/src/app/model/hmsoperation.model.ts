export class hmsoperation {
    public operationid: number; public patientid: number; public operationdate: Date; public operationstarttime: string; public operationenddate: Date; public operationendtime: string; public operatedplace: number; public operatedplacedesc: string; public surgeon: number; public surgeondesc: string; public assistant: number; public assistantdesc: string; public physician: number; public physiciandesc: string; public anesthesian: number; public anesthesiandesc: string; public anesthesiatechnique: string; public anesthesiatechniquedesc: string; public pressure: number; public pulse: number; public weight: number; public operationtype: number; public operationtypedesc: string; public complexity: string; public complexitydesc: string; public riskfactor: string; public riskfactordesc: string; public notes: string; public operationsteps: string; public preproceduremedication: string; public preoperativediagnosis: string; public preoperativefindings: string; public postoperativefindings: string; public postoperationcourse: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmsoperationResponse {
    total: number;
    results: hmsoperation[];
}

