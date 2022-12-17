export class pmspropertyapplicants {
public applicantiddesc :string;public applicantid :number;public propertyid :number;public unitid :number;public firstname :string;public lastname :string;public iscompany :boolean;public companyname :string;public dateofbirth :Date;public identityno :string;public gender :string;public email :string;public phone :string;public license :string;public occupants :string;public preferredmoveindate :Date;public shortbio :string;public vehicledetails :string;public petdetails :string;public currentpropertymoveindate :Date;public currentpropertymoveoutdate :Date;public address :string;public landlordfirstname :string;public landlordlastname :string;public landlordemail :string;public landlordphone :string;public employer :string;public position :string;public joineddate :Date;public enddate :Date;public workemail :string;public workphone :string;public officephone :string;public officeaddress :string;public monthlyincome :number;public supervisorfirstname :string;public supervisorlastname :string;public supervisoremail :string;public supervisorphone :string;public additionalincome :number;public ecfirstname :string;public eclastname :string;public ecemail :string;public ecphone :string;public relationshipdetails :string;public referencefirstname :string;public referencelastname :string;public referenceemail :string;public referencephone :string;public status :string;
constructor() {}
}
export interface IpmspropertyapplicantsResponse {
total: number;
results: pmspropertyapplicants[];
}

