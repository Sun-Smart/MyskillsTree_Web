export class hrmsleavepolicymaster {
public leavetypeiddesc :string;public leavetypeid :number;public leavename :string;public applicableto :string;public applicabletodesc :string;public effectivefrom :number;public leavebasedon :string;public leavebasedondesc :string;public eligibledays :number;public carryforward :boolean;public encashmentdays :number;public maxaccumulation :number;public prorata :string;public proratadesc :string;public proratabasis :string;public proratabasisdesc :string;public prefixsuffix :boolean;public maxleaveinmonth :number;public conversiontoleavetype :number;public conversiontoleavetypedesc :string;public salaryreduction :number;public gender :string;public genderdesc :string;public allowhalfday :boolean;public allowduringresignation :boolean;public preapproveddays :number;public attachmentname :string;public attachmentcondition :string;public notes :string;public status :string;
constructor() {}
}
export interface IhrmsleavepolicymasterResponse {
total: number;
results: hrmsleavepolicymaster[];
}

