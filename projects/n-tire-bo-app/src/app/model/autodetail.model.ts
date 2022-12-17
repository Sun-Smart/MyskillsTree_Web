export class autodetail {
public detailiddesc :string;public detailid :number;public masterid :number;public columnname :string;public title :string;public placeholder :string;public fk_fd :string;public list :boolean;public pk :boolean;public defaults :string;public uniques :boolean;public required :boolean;public readmode :boolean;public hide :boolean;public datatype :string;public datatypedesc :string;public multilist :boolean;public othercolsinfunctions :string;public visible :boolean;public functions :boolean;public copyfrommaster :boolean;public negative :boolean;public decimalplaces :number;public hyperlinktable :string;public dateparameter :boolean;public labeldropdown :boolean;public duplicatecheck :boolean;public serialkey :boolean;public customformfield :boolean;public status :string;public fk_fd_record :string;public fk_fd_alias :string;public fk_fd_key :string;public fk_fd_description :string;public fk_fd_condition :string;public fk_fd_option :string;public fk_fd_mappings :string;public dependantsourcecolumn :string;public dependantdestinationcolumn :string;public fillroute :string;public fillfunction :string;public afterselectfunction :string;public derived_outputtype :string;public derived_expression :string;public derived_dependantcolumns :string;public derived_columntoexecute :string;public derived_expressiontoexecute :string;public derived_functiontocall :string;public parameter :string;public parentchild :boolean;public reportid :string;
constructor() {}
}
export interface IautodetailResponse {
total: number;
results: autodetail[];
}

