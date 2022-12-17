import { hrmsquestionmaster } from './../../../model/hrmsquestionmaster.model';
import { hrmsquestionmasterService } from './../../../service/hrmsquestionmaster.service';
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
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';


@Component({
selector: 'app-hrmsquestionmasterList',
templateUrl: './hrmsquestionmaster.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class hrmsquestionmasterListComponent implements OnInit {
@ViewChild('tblhrmsquestionmasterssource',{static:false}) tblhrmsquestionmasterssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatehrmsquestionmasters:boolean=false;
datahrmsquestionmastersroleid3:any=[];
datahrmsquestionmasterscategory3:any=[];
datahrmsquestionmasterssubcategory3:any=[];
datahrmsquestionmastersanswermode3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedhrmsquestionmasterIDs: string="";
hrmsquestionmastersID: string = "";
hrmsquestionmastersselectedindex:any;
hrmsquestionmasterssettings:any;
hrmsquestionmasterssource: any;

showhrmsquestionmastersCheckbox()
{
debugger;
if(this.tblhrmsquestionmasterssource.settings['selectMode']== 'multi')this.tblhrmsquestionmasterssource.settings['selectMode']= 'single';
else
this.tblhrmsquestionmasterssource.settings['selectMode']= 'multi';
this.tblhrmsquestionmasterssource.initGrid();
}
deletehrmsquestionmastersAll()
{
this.tblhrmsquestionmasterssource.settings['selectMode'] = 'single';
}
showhrmsquestionmastersFilter()
{
  setTimeout(() => {
  this.SethrmsquestionmastersTableddConfig();
  });
      if(this.tblhrmsquestionmasterssource.settings!=null)this.tblhrmsquestionmasterssource.settings['hideSubHeader'] =!this.tblhrmsquestionmasterssource.settings['hideSubHeader'];
this.tblhrmsquestionmasterssource.initGrid();
}
showhrmsquestionmastersInActive()
{
}
enablehrmsquestionmastersInActive()
{
}
async SethrmsquestionmastersTableddConfig()
{
if(!this.bfilterPopulatehrmsquestionmasters){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsquestionmastersroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsquestionmastersroleid3.push(obj);
}
if((this.tblhrmsquestionmasterssource.settings as any).columns['roleid'])
{
(this.tblhrmsquestionmasterssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsquestionmastersroleid3));
this.tblhrmsquestionmasterssource.initGrid();
}
});

this.bomasterdataservice.getList("mj5qo").then(res=>
{
var datacategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsquestionmasterscategory3.push(defaultobj);
for(let i=0; i<datacategory2.length; i++){
var obj= { value: datacategory2[i].masterdataid, title:datacategory2[i].masterdatadescription};
this.datahrmsquestionmasterscategory3.push(obj);
}
if((this.tblhrmsquestionmasterssource.settings as any).columns['category'])
{
(this.tblhrmsquestionmasterssource.settings as any).columns['category'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsquestionmasterscategory3));
this.tblhrmsquestionmasterssource.initGrid();
}
});

this.bosubcategorymasterservice.getbosubcategorymastersList().then(res=>
{
var datasubcategory2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsquestionmasterssubcategory3.push(defaultobj);
for(let i=0; i<datasubcategory2.length; i++){
var obj= { value: datasubcategory2[i].subcategoryid, title:datasubcategory2[i].subcategoryname};
this.datahrmsquestionmasterssubcategory3.push(obj);
}
if((this.tblhrmsquestionmasterssource.settings as any).columns['subcategory'])
{
(this.tblhrmsquestionmasterssource.settings as any).columns['subcategory'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsquestionmasterssubcategory3));
this.tblhrmsquestionmasterssource.initGrid();
}
});

this.configservice.getList("answermode").then(res=>
{
var dataanswermode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsquestionmastersanswermode3.push(defaultobj);
for(let i=0; i<dataanswermode2.length; i++){
var obj= { value: dataanswermode2[i].configkey, title: dataanswermode2[i].configtext};
this.datahrmsquestionmastersanswermode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsquestionmasterssource.settings);
if(clone.columns['answermode']!=undefined)clone.columns['answermode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsquestionmastersanswermode3)), }, };
if(clone.columns['answermode']!=undefined)clone.columns['answermode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsquestionmastersanswermode3)), }, };
this.tblhrmsquestionmasterssource.settings =  clone;
this.tblhrmsquestionmasterssource.initGrid();
});
}
this.bfilterPopulatehrmsquestionmasters=true;
}
async hrmsquestionmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsquestionmastersTableConfig()
{
this.hrmsquestionmasterssettings = {
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
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsquestionmastersroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
category: {
title: 'Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsquestionmasterscategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
subcategory: {
title: 'Sub Category',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsquestionmasterssubcategory3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
question: {
title: 'Question',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
answer: {
title: 'Answer',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
answermode: {
title: 'Answer Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsquestionmastersanswermode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
dropdownvalues: {
title: 'Drop Down Values',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
},
};
}
hrmsquestionmastersLoadTable(){
this.hrmsquestionmasterservice.gethrmsquestionmastersList().then((data) => {
this.hrmsquestionmasterservice.list=data as hrmsquestionmaster[];
this.hrmsquestionmasterssource=new LocalDataSource();
this.hrmsquestionmasterssource.load(this.hrmsquestionmasterservice.list as any as LocalDataSource);
this.hrmsquestionmasterssource.setPaging(1, 20, true);
});
}
hrmsquestionmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsquestionmasterservice.list.length == 0)
{
    this.tblhrmsquestionmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsquestionmaster();
    this.hrmsquestionmasterservice.list.push(obj);
    this.hrmsquestionmasterssource.refresh();
    if ((this.hrmsquestionmasterservice.list.length / this.hrmsquestionmasterssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsquestionmasterssource.getPaging().page)
    {
        this.hrmsquestionmasterssource.setPage((this.hrmsquestionmasterservice.list.length / this.hrmsquestionmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsquestionmasterssource.grid.edit(this.tblhrmsquestionmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsquestionmasterssource.data.indexOf(event.data);
this.onDeletehrmsquestionmaster(event,event.data.qmid,((this.hrmsquestionmasterssource.getPaging().page-1) *this.hrmsquestionmasterssource.getPaging().perPage)+index);
this.hrmsquestionmasterssource.refresh();
}
break;
}
}
hrmsquestionmastersPaging(val)
{
debugger;
this.hrmsquestionmasterssource.setPaging(1, val, true);
}
onDeletehrmsquestionmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsquestionmasterIDs += childID + ",";
this.hrmsquestionmasterservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private hrmsquestionmasterservice: hrmsquestionmasterService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.hrmsquestionmasterservice.DeletedhrmsquestionmasterIDs = this.DeletedhrmsquestionmasterIDs;
this.hrmsquestionmasterservice.saveOrUpdatehrmsquestionmastersList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.hrmsquestionmasterservice.clearList();
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
this.SethrmsquestionmastersTableConfig();
this.hrmsquestionmastersLoadTable();
  setTimeout(() => {
  this.SethrmsquestionmastersTableddConfig();
  });
}

populateForm(pd: hrmsquestionmaster) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.hrmsquestionmasterservice.formData = Object.assign({}, pd);
}
// 

}


}

