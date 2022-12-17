import { hrmsrecruittask } from './../../../model/hrmsrecruittask.model';
import { hrmsrecruittaskService } from './../../../service/hrmsrecruittask.service';
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
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';


@Component({
selector: 'app-hrmsrecruittaskList',
templateUrl: './hrmsrecruittask.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class hrmsrecruittaskListComponent implements OnInit {
@ViewChild('tblhrmsrecruittaskssource',{static:false}) tblhrmsrecruittaskssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatehrmsrecruittasks:boolean=false;
datahrmsrecruittasksroleid3:any=[];
datahrmsrecruittasksuserid3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedhrmsrecruittaskIDs: string="";
hrmsrecruittasksID: string = "";
hrmsrecruittasksselectedindex:any;
hrmsrecruittaskssettings:any;
hrmsrecruittaskssource: any;

showhrmsrecruittasksCheckbox()
{
debugger;
if(this.tblhrmsrecruittaskssource.settings['selectMode']== 'multi')this.tblhrmsrecruittaskssource.settings['selectMode']= 'single';
else
this.tblhrmsrecruittaskssource.settings['selectMode']= 'multi';
this.tblhrmsrecruittaskssource.initGrid();
}
deletehrmsrecruittasksAll()
{
this.tblhrmsrecruittaskssource.settings['selectMode'] = 'single';
}
showhrmsrecruittasksFilter()
{
  setTimeout(() => {
  this.SethrmsrecruittasksTableddConfig();
  });
      if(this.tblhrmsrecruittaskssource.settings!=null)this.tblhrmsrecruittaskssource.settings['hideSubHeader'] =!this.tblhrmsrecruittaskssource.settings['hideSubHeader'];
this.tblhrmsrecruittaskssource.initGrid();
}
showhrmsrecruittasksInActive()
{
}
enablehrmsrecruittasksInActive()
{
}
async SethrmsrecruittasksTableddConfig()
{
if(!this.bfilterPopulatehrmsrecruittasks){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsrecruittasksroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsrecruittasksroleid3.push(obj);
}
if((this.tblhrmsrecruittaskssource.settings as any).columns['roleid'])
{
(this.tblhrmsrecruittaskssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsrecruittasksroleid3));
this.tblhrmsrecruittaskssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datauserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsrecruittasksuserid3.push(defaultobj);
for(let i=0; i<datauserid2.length; i++){
var obj= { value: datauserid2[i].userid, title:datauserid2[i].username};
this.datahrmsrecruittasksuserid3.push(obj);
}
if((this.tblhrmsrecruittaskssource.settings as any).columns['userid'])
{
(this.tblhrmsrecruittaskssource.settings as any).columns['userid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsrecruittasksuserid3));
this.tblhrmsrecruittaskssource.initGrid();
}
});
}
this.bfilterPopulatehrmsrecruittasks=true;
}
async hrmsrecruittasksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsrecruittasksTableConfig()
{
this.hrmsrecruittaskssettings = {
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
currentdate: {
title: 'Current Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsrecruittasksroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
userid: {
title: 'User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsrecruittasksuserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
totalcount: {
title: 'Total Count',
type: 'number',
filter:true,
},
},
};
}
hrmsrecruittasksLoadTable(){
this.hrmsrecruittaskservice.gethrmsrecruittasksList().then((data) => {
this.hrmsrecruittaskservice.list=data as hrmsrecruittask[];
this.hrmsrecruittaskssource=new LocalDataSource();
this.hrmsrecruittaskssource.load(this.hrmsrecruittaskservice.list as any as LocalDataSource);
this.hrmsrecruittaskssource.setPaging(1, 20, true);
});
}
hrmsrecruittasksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsrecruittaskservice.list.length == 0)
{
    this.tblhrmsrecruittaskssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsrecruittask();
    this.hrmsrecruittaskservice.list.push(obj);
    this.hrmsrecruittaskssource.refresh();
    if ((this.hrmsrecruittaskservice.list.length / this.hrmsrecruittaskssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsrecruittaskssource.getPaging().page)
    {
        this.hrmsrecruittaskssource.setPage((this.hrmsrecruittaskservice.list.length / this.hrmsrecruittaskssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsrecruittaskssource.grid.edit(this.tblhrmsrecruittaskssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsrecruittaskssource.data.indexOf(event.data);
this.onDeletehrmsrecruittask(event,event.data.taskid,((this.hrmsrecruittaskssource.getPaging().page-1) *this.hrmsrecruittaskssource.getPaging().perPage)+index);
this.hrmsrecruittaskssource.refresh();
break;
}
}
hrmsrecruittasksPaging(val)
{
debugger;
this.hrmsrecruittaskssource.setPaging(1, val, true);
}
onDeletehrmsrecruittask(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsrecruittaskIDs += childID + ",";
this.hrmsrecruittaskservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private hrmsrecruittaskservice: hrmsrecruittaskService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
private bousermasterservice:bousermasterService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.hrmsrecruittaskservice.DeletedhrmsrecruittaskIDs = this.DeletedhrmsrecruittaskIDs;
this.hrmsrecruittaskservice.saveOrUpdatehrmsrecruittasksList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.hrmsrecruittaskservice.clearList();
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
this.SethrmsrecruittasksTableConfig();
this.hrmsrecruittasksLoadTable();
  setTimeout(() => {
  this.SethrmsrecruittasksTableddConfig();
  });
}

populateForm(pd: hrmsrecruittask) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.hrmsrecruittaskservice.formData = Object.assign({}, pd);
}
// 

}


}

