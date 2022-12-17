export class ecmcustomerbasketattribute {
public attributeiddesc :string;public attributeid :number;public customersbasketid :number;public customerid :number;public productid :number;public optionid :number;public optioniddesc :string;public valueid :number;public valueiddesc :string;public status :string;
constructor() {}
}
export interface IecmcustomerbasketattributeResponse {
total: number;
results: ecmcustomerbasketattribute[];
}

