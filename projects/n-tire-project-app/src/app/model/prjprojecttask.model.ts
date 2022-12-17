export class prjprojecttask {
public projectid :number;public deliverableid :number;public departmentid :number;public taskiddesc :string;public taskid :number;public taskcode :string;public taskname :string;public storypoints :number;public feedbacktags :string;public details :string;public issues :string;public milestone :boolean;public startdate :Date;public enddate :Date;public assignedto :string;public workdoneby :number;public workdonebydesc :string;public priority :string;public prioritydesc :string;public complexity :string;public complexitydesc :string;public taskcategory :string;public taskcategorydesc :string;public tasktype :string;public tasktypedesc :string;public activitytype :number;public isbillable :boolean;public colorcode :string;public colorcodedesc :string;public parenttasks :string;public dependenttasks :string;public taskstatus :string;public taskstatusdesc :string;public actualworkdone :string;public actualstartdate :Date;public actualenddate :Date;public estimatedpercentage :number;public completionpercentage :number;public estimatedeffort :string;public actualeffort :string;public utilizationpercentage :number;public labourbudget :number;public labouractual :number;public predecessor :string;public sequence :number;public feedbacknotes :string;public notes :string;public draft :boolean;public outputid :number;public customfield :string;public attachment :string;public status :string;public DeletedbofactIDs :string;
constructor() {}
}
export interface IprjprojecttaskResponse {
total: number;
results: prjprojecttask[];
}

