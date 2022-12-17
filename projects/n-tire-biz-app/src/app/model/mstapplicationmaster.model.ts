export class mstapplicationmaster {
    public applicantiddesc: string; public applicantid: number; public firstname: string; public lastname: string; public emailid: string; public mobilenumber: string; public applicanttype: string; public applicanttypedesc: string; public address1: string; public address2: string; public address3: string; public country: number; public countrydesc: string; public state: number; public statedesc: string; public city: number; public citydesc: string; public zipcode: string; public recoveryemailid: string; public profilephoto: string; public briefintroduction: string; public statuscrimp: string; public availableforjob: boolean; public attachment: string; public status: string; public DeletedmstapplicantworkreferenceIDs: string; public DeletedmstapplicantsocialmediadetailIDs: string; public DeletedmstapplicantskilldetailIDs: string; public DeletedmstapplicantgeographypreferenceIDs: string; public DeletedmstapplicanteducationdetailIDs: string; public DeletedmstapplicantachievementdetailIDs: string; public DeletedmstapplicantcareerdetailIDs: string; public DeletedmstapplicantreferencedetailIDs: string; public DeletedmstapplicantreferencerequestIDs: string; public DeletedmstapplicantlanguagedetailIDs: string;
    constructor() { }
}
export interface ImstapplicationmasterResponse {
    total: number;
    results: mstapplicationmaster[];
}

