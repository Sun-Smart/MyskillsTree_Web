export class erpsupplierfinancialdata {
public supplierid :number;public supplieriddesc :string;public finyear :number;public finyeardesc :string;public findataiddesc :string;public findataid :number;public turnovermillions :string;public profitbeforetax :string;public growthpercentage :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpsupplierfinancialdataResponse {
total: number;
results: erpsupplierfinancialdata[];
}

