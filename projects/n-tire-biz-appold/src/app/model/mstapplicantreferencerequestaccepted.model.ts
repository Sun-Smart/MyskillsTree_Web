export class mstapplicantreferencerequestaccepted {
    public applicantid: number;
    public applicantiddesc: string;
    public requestiddesc: string;
    public requestid: number;
    public requestmasterdatatypeid: number;
    public requestmasterdatatypeiddesc: string;
    public requestmasterid: number;
    public requestreferencedate: Date;
    public requestedcontact: string;
    public contactdesignation: string;
    public contactemailid: string;
    public contactmobile: string;
    public contactuserid: number;
    public requestremarks: string;
    public referencedate: Date;
    public referenceacceptance: string;
    public referenceacceptancedesc: string;
    public referenceremarks: string;
    public contactfileattach: string;
    public sent: boolean;
    public received: boolean;
    public attachment: string;
    public status: string;
    constructor() { }
}
export interface ImstapplicantreferencerequestacceptedResponse {
    total: number;
    results: mstapplicantreferencerequestaccepted[];
}

