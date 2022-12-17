export class ecmcustomerbasket {
public customersbasketiddesc :string;public customersbasketid :number;public customerid :number;public customeriddesc :string;public productid :number;public productiddesc :string;public quantity :number;public price :number;public dateadded :Date;public status :string;public DeletedecmcustomerbasketattributeIDs :string;
constructor() {}
}
export interface IecmcustomerbasketResponse {
total: number;
results: ecmcustomerbasket[];
}

