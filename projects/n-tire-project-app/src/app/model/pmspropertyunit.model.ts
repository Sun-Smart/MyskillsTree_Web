export class pmspropertyunit {
public unitiddesc :string;public unitid :number;public propertyid :number;public unitno :string;public details :string;public unittype :string;public unittypedesc :string;public address1 :string;public address2 :string;public sqft :number;public sizedetails :string;public beds :string;public bedsdesc :string;public baths :string;public bathsdesc :string;public term :string;public rent :number;public deposit :number;public notes :string;public assignowner :boolean;public ownernotes :string;public advance :number;public invoiceday :number;public hasfirstrentcommission :boolean;public firstrentcommissiontype :string;public firstrentcommissiontypedesc :string;public firstrentcommission :number;public hasrentcommission :boolean;public rentcommissiontype :string;public rentcommissiontypedesc :string;public rentcommission :number;public hasrenewalfee :boolean;public renewalfeetype :string;public renewalfeetypedesc :string;public renewalfee :number;public hasservicefee :boolean;public servicefeetype :string;public servicefeetypedesc :string;public servicefee :number;public customfield :string;public attachment :string;public unitstatus :string;public lasttenantid :number;public vacateddate :Date;public status :string;
constructor() {}
}
export interface IpmspropertyunitResponse {
total: number;
results: pmspropertyunit[];
}

