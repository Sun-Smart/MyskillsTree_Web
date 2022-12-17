export class erpsupplierregistration {
public registrationiddesc :string;public registrationid :number;public name :string;public registrationdate :Date;public licensed :boolean;public licensenumber :string;public licensefile :string;public taxregistrationnumber :string;public taxfile :string;public companydetails :string;public contactperson :string;public designation :string;public cpmobile :string;public cpemail :string;public establishmentyear :number;public email :string;public password :string;public suppliertype :string;public suppliertypedesc :string;public language :number;public languagedesc :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pin :string;public directline :string;public extension :string;public website :string;public telephone :string;public products :string;public services :string;public servicelocations :string;public insured :boolean;public bonded :boolean;public remarks :string;public customfield :string;public attachment :string;public creditcardtype :string;public creditcardtypedesc :string;public creditcardnumber :string;public expirymonth :string;public expirymonthdesc :string;public expiryyear :string;public expiryyeardesc :string;public cvv :string;public registrationamount :number;public status :string;public statusdesc :string;public DeletederpregisteredsupplierproductcategoryIDs :string;
constructor() {}
}
export interface IerpsupplierregistrationResponse {
total: number;
results: erpsupplierregistration[];
}

