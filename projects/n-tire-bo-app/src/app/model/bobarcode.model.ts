export class bobarcode {
public barcodeiddesc :string;public barcodeid :number;public elementtype :string;public format :string;public linecolor :string;public width :number;public height :number;public displayvalue :boolean;public fontoptions :string;public font :string;public textalign :string;public textposition :string;public textmargin :number;public fontsize :number;public background :string;public margin :number;public margintop :number;public marginbottom :number;public marginleft :number;public marginright :number;public status :string;
constructor() {}
}
export interface IbobarcodeResponse {
total: number;
results: bobarcode[];
}

