import { hrmsemployeemonthlyattendance } from './../../../model/hrmsemployeemonthlyattendance.model';
import { hrmsemployeemonthlyattendanceService } from './../../../service/hrmsemployeemonthlyattendance.service';
import { Component, OnInit , Inject,Optional, ViewChild} from '@angular/core';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';


@Component({
selector: 'app-hrmsemployeemonthlyattendanceList',
templateUrl: './hrmsemployeemonthlyattendance.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class hrmsemployeemonthlyattendanceListComponent implements OnInit {
@ViewChild('tblhrmsemployeemonthlyattendancessource',{static:false}) tblhrmsemployeemonthlyattendancessource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatehrmsemployeemonthlyattendances:boolean=false;
datahrmsemployeemonthlyattendancesemployeeid3:any=[];
datahrmsemployeemonthlyattendancesdepartmentid3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedhrmsemployeemonthlyattendanceIDs: string="";
hrmsemployeemonthlyattendancesID: string = "";
hrmsemployeemonthlyattendancesselectedindex:any;
hrmsemployeemonthlyattendancessettings:any;
hrmsemployeemonthlyattendancessource: any;

showhrmsemployeemonthlyattendancesCheckbox()
{
debugger;
if(this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']== 'multi')this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeemonthlyattendancessource.settings['selectMode']= 'multi';
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
deletehrmsemployeemonthlyattendancesAll()
{
this.tblhrmsemployeemonthlyattendancessource.settings['selectMode'] = 'single';
}
showhrmsemployeemonthlyattendancesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeemonthlyattendancesTableddConfig();
  });
      if(this.tblhrmsemployeemonthlyattendancessource.settings!=null)this.tblhrmsemployeemonthlyattendancessource.settings['hideSubHeader'] =!this.tblhrmsemployeemonthlyattendancessource.settings['hideSubHeader'];
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
showhrmsemployeemonthlyattendancesInActive()
{
}
enablehrmsemployeemonthlyattendancesInActive()
{
}
async SethrmsemployeemonthlyattendancesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeemonthlyattendances){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlyattendancesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeemonthlyattendancesemployeeid3.push(obj);
}
if((this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeemonthlyattendancesemployeeid3));
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
});

this.bomasterdataservice.getList("qghhe").then(res=>
{
var datadepartmentid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeemonthlyattendancesdepartmentid3.push(defaultobj);
for(let i=0; i<datadepartmentid2.length; i++){
var obj= { value: datadepartmentid2[i].masterdataid, title:datadepartmentid2[i].masterdatadescription};
this.datahrmsemployeemonthlyattendancesdepartmentid3.push(obj);
}
if((this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['departmentid'])
{
(this.tblhrmsemployeemonthlyattendancessource.settings as any).columns['departmentid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeemonthlyattendancesdepartmentid3));
this.tblhrmsemployeemonthlyattendancessource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeemonthlyattendances=true;
}
async hrmsemployeemonthlyattendancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeemonthlyattendancesTableConfig()
{
this.hrmsemployeemonthlyattendancessettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: !this.showview, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeemonthlyattendancesemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
employeename: {
title: 'Employee Name',
type: '',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeemonthlyattendancesdepartmentid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
totaldays: {
title: 'Total Days',
type: 'number',
filter:true,
},
workingdays: {
title: 'Working Days',
type: 'number',
filter:true,
},
holidays: {
title: 'Holidays',
type: 'number',
filter:true,
},
presentdays: {
title: 'Present Days',
type: 'number',
filter:true,
},
approvedleavedays: {
title: 'Approved Leave Days',
type: 'number',
filter:true,
},
adhocleavedays: {
title: 'Adhoc Leave Days',
type: 'number',
filter:true,
},
latelophours: {
title: 'Late L O P Hours',
type: 'number',
filter:true,
},
},
};
}
hrmsemployeemonthlyattendancesLoadTable(){
this.hrmsemployeemonthlyattendanceservice.gethrmsemployeemonthlyattendancesList().then((data) => {
this.hrmsemployeemonthlyattendanceservice.list=data as hrmsemployeemonthlyattendance[];
this.hrmsemployeemonthlyattendancessource=new LocalDataSource();
this.hrmsemployeemonthlyattendancessource.load(this.hrmsemployeemonthlyattendanceservice.list as any as LocalDataSource);
this.hrmsemployeemonthlyattendancessource.setPaging(1, 20, true);
});
}
hrmsemployeemonthlyattendancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsemployeemonthlyattendanceservice.list.length == 0)
{
    this.tblhrmsemployeemonthlyattendancessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeemonthlyattendance();
    this.hrmsemployeemonthlyattendanceservice.list.push(obj);
    this.hrmsemployeemonthlyattendancessource.refresh();
    if ((this.hrmsemployeemonthlyattendanceservice.list.length / this.hrmsemployeemonthlyattendancessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeemonthlyattendancessource.getPaging().page)
    {
        this.hrmsemployeemonthlyattendancessource.setPage((this.hrmsemployeemonthlyattendanceservice.list.length / this.hrmsemployeemonthlyattendancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeemonthlyattendancessource.grid.edit(this.tblhrmsemployeemonthlyattendancessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsemployeemonthlyattendancessource.data.indexOf(event.data);
this.onDeletehrmsemployeemonthlyattendance(event,event.data.attendanceid,((this.hrmsemployeemonthlyattendancessource.getPaging().page-1) *this.hrmsemployeemonthlyattendancessource.getPaging().perPage)+index);
this.hrmsemployeemonthlyattendancessource.refresh();
}
break;
}
}
hrmsemployeemonthlyattendancesPaging(val)
{
debugger;
this.hrmsemployeemonthlyattendancessource.setPaging(1, val, true);
}
onDeletehrmsemployeemonthlyattendance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeemonthlyattendanceIDs += childID + ",";
this.hrmsemployeemonthlyattendanceservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private hrmsemployeemonthlyattendanceservice: hrmsemployeemonthlyattendanceService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.hrmsemployeemonthlyattendanceservice.DeletedhrmsemployeemonthlyattendanceIDs = this.DeletedhrmsemployeemonthlyattendanceIDs;
this.hrmsemployeemonthlyattendanceservice.saveOrUpdatehrmsemployeemonthlyattendancesList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.hrmsemployeemonthlyattendanceservice.clearList();
this.resetForm();
}*/
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
this.sharedService.alert(err.error);
console.log(err);
}
)
}async ngOnInit() {
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null)
{
    this.SESSIONUSERID = this.sessiondata.userid;
}
if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
if (this.data!= null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.showview=true;
}
this.theme=this.sessionService.getItem('selected-theme');
this.SethrmsemployeemonthlyattendancesTableConfig();
this.hrmsemployeemonthlyattendancesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeemonthlyattendancesTableddConfig();
  });
}

populateForm(pd: hrmsemployeemonthlyattendance) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.hrmsemployeemonthlyattendanceservice.formData = Object.assign({}, pd);
}
// 

}


}

