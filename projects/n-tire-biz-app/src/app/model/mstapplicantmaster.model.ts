export class mstapplicantmaster {
    public applicantiddesc: string; public applicantid: number; public firstname: string; public lastname: string; public emailid: string; public mobilenumber: string; public applicanttype: string; public applicanttypedesc: string; public gender: string; public genderdesc: string; public dob: Date; public address1: string; public address2: string; public address3: string; public country: number; public countrydesc: string; public state: number; public statedesc: string; public city: number; public citydesc: string; public zipcode: string; public recoveryemailid: string; public profilephoto: string; public briefintroduction: string; public statuscrimp: string; public availableforjob: boolean; public profilecompletion: number; public applicantreference: string; public attachment: string; public status: string; public Deleted_mstapplicantgeographypreference_IDs: string; public Deleted_mstapplicantcareerdetail_IDs: string; public Deleted_mstapplicantreferencedetail_IDs: string; public Deleted_mstapplicantskilldetail_IDs: string; public Deleted_mstapplicantworkreference_IDs: string; public Deleted_mstapplicantsocialmediadetail_IDs: string; public Deleted_mstapplicantachievementdetail_IDs: string; public Deleted_mstapplicantlanguagedetail_IDs: string; public Deleted_mstapplicanteducationdetail_IDs: string; public Deleted_mstjobstatus_IDs: string; public Deleted_mstapplicantreferencerequest_IDs: string;releasestatus:boolean;
    constructor() {
        this.releasestatus= true;
     }
}
export interface ImstapplicantmasterResponse {
    total: number;
    results: mstapplicantmaster[];
}

