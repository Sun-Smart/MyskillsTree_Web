export class hrmsemployeetaxcalculation {
public taxiddesc :string;public taxid :number;public employeeid :number;public financialyear :number;public financialyeardesc :string;public totalincome :number;public lessgeneralwaivers :number;public lesssectionwaivers :number;public taxableincome :number;public lesssectionwaiversontaxableincome :number;public nettaxamount :number;public addadditionaltaxontaxamount :number;public tax :number;public addadditionaltaxontax :number;public taxpayable :number;public status :string;
constructor() {}
}
export interface IhrmsemployeetaxcalculationResponse {
total: number;
results: hrmsemployeetaxcalculation[];
}

