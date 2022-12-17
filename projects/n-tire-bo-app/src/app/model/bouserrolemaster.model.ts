export class bouserrolemaster {
public userroleiddesc :string;public userroleid :number;public userrole :string;public thumbnail :string;public musthaveskills :string;public preferredskills :string;public keywords :string;public dealbreakers :string;public softskills :string;public additionalnotes :string;public salary :number;public screeningprocess :string;public phoneinterviewers :string;public onsiteinterviewprocess :string;public points :number;public advertisementtitle1 :string;public advertisementdetails1 :string;public advertisementtitle2 :string;public advertisementdetails2 :string;public advertisementtitle3 :string;public advertisementdetails3 :string;public status :string;public DeletedbousertypemenuaccessIDs :string;public DeletedbouserrolemasterIDs :string;public DeletedhrmsinterviewrolescoringIDs :string;
constructor() {}
}
export interface IbouserrolemasterResponse {
total: number;
results: bouserrolemaster[];
}

