import { lmstargetorglevel } from './../../../model/lmstargetorglevel.model';
import { lmstargetorglevelService } from './../../../service/lmstargetorglevel.service';
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
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';


@Component({
selector: 'app-lmstargetorglevelList',
templateUrl: './lmstargetorglevel.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetorglevelListComponent implements OnInit {
@ViewChild('tbllmstargetorglevelssource',{static:false}) tbllmstargetorglevelssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmstargetorglevels:boolean=false;
datalmstargetorglevelsterm3:any=[];
datalmstargetorglevelsproductgroupid3:any=[];
datalmstargetorglevelsperformancestatus3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmstargetorglevelIDs: string="";
lmstargetorglevelsID: string = "";
lmstargetorglevelsselectedindex:any;
lmstargetorglevelssettings:any;
lmstargetorglevelssource: any;

showlmstargetorglevelsCheckbox()
{
debugger;
if(this.tbllmstargetorglevelssource.settings['selectMode']== 'multi')this.tbllmstargetorglevelssource.settings['selectMode']= 'single';
else
this.tbllmstargetorglevelssource.settings['selectMode']= 'multi';
this.tbllmstargetorglevelssource.initGrid();
}
deletelmstargetorglevelsAll()
{
this.tbllmstargetorglevelssource.settings['selectMode'] = 'single';
}
showlmstargetorglevelsFilter()
{
  setTimeout(() => {
  this.SetlmstargetorglevelsTableddConfig();
  });
      if(this.tbllmstargetorglevelssource.settings!=null)this.tbllmstargetorglevelssource.settings['hideSubHeader'] =!this.tbllmstargetorglevelssource.settings['hideSubHeader'];
this.tbllmstargetorglevelssource.initGrid();
}
showlmstargetorglevelsInActive()
{
}
enablelmstargetorglevelsInActive()
{
}
async SetlmstargetorglevelsTableddConfig()
{
if(!this.bfilterPopulatelmstargetorglevels){

this.configservice.getList("term").then(res=>
{
var dataterm2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetorglevelsterm3.push(defaultobj);
for(let i=0; i<dataterm2.length; i++){
var obj= { value: dataterm2[i].configkey, title: dataterm2[i].configtext};
this.datalmstargetorglevelsterm3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetorglevelssource.settings);
if(clone.columns['term']!=undefined)clone.columns['term'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetorglevelsterm3)), }, };
if(clone.columns['term']!=undefined)clone.columns['term'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetorglevelsterm3)), }, };
this.tbllmstargetorglevelssource.settings =  clone;
this.tbllmstargetorglevelssource.initGrid();
});

this.bomasterdataservice.getList("kft5a").then(res=>
{
var dataproductgroupid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetorglevelsproductgroupid3.push(defaultobj);
for(let i=0; i<dataproductgroupid2.length; i++){
var obj= { value: dataproductgroupid2[i].masterdataid, title:dataproductgroupid2[i].masterdatadescription};
this.datalmstargetorglevelsproductgroupid3.push(obj);
}
if((this.tbllmstargetorglevelssource.settings as any).columns['productgroupid'])
{
(this.tbllmstargetorglevelssource.settings as any).columns['productgroupid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetorglevelsproductgroupid3));
this.tbllmstargetorglevelssource.initGrid();
}
});

this.configservice.getList("performancestatus").then(res=>
{
var dataperformancestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetorglevelsperformancestatus3.push(defaultobj);
for(let i=0; i<dataperformancestatus2.length; i++){
var obj= { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext};
this.datalmstargetorglevelsperformancestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetorglevelssource.settings);
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetorglevelsperformancestatus3)), }, };
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetorglevelsperformancestatus3)), }, };
this.tbllmstargetorglevelssource.settings =  clone;
this.tbllmstargetorglevelssource.initGrid();
});
}
this.bfilterPopulatelmstargetorglevels=true;
}
async lmstargetorglevelsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmstargetorglevelsTableConfig()
{
this.lmstargetorglevelssettings = {
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
term: {
title: 'Term',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmstargetorglevelsterm3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
productgroupid: {
title: 'Product Group',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmstargetorglevelsproductgroupid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
committedsalesnumbers: {
title: 'Committed Sales Numbers',
type: 'number',
filter:true,
},
committedsalesvalue: {
title: 'Committed Sales Value',
type: '',
filter:true,
},
likelysalesnumbers: {
title: 'Likely Sales Numbers',
type: 'number',
filter:true,
},
likelysalesvalue: {
title: 'Likely Sales Value',
type: '',
filter:true,
},
bestcasesalesnumbers: {
title: 'Best Case Sales Numbers',
type: 'number',
filter:true,
},
bestcasesalesvalue: {
title: 'Best Case Sales Value',
type: '',
filter:true,
},
actualsalesnumbers: {
title: 'Actual Sales Numbers',
type: 'number',
filter:true,
},
actualsalesvalue: {
title: 'Actual Sales Value',
type: '',
filter:true,
},
performancestatus: {
title: 'Performance Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmstargetorglevelsperformancestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
lmstargetorglevelsLoadTable(){
this.lmstargetorglevelservice.getlmstargetorglevelsList().then((data) => {
this.lmstargetorglevelservice.list=data as lmstargetorglevel[];
this.lmstargetorglevelssource=new LocalDataSource();
this.lmstargetorglevelssource.load(this.lmstargetorglevelservice.list as any as LocalDataSource);
this.lmstargetorglevelssource.setPaging(1, 20, true);
});
}
lmstargetorglevelsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmstargetorglevelservice.list.length == 0)
{
    this.tbllmstargetorglevelssource.grid.createFormShown = true;
}
else
{
    let obj = new lmstargetorglevel();
    this.lmstargetorglevelservice.list.push(obj);
    this.lmstargetorglevelssource.refresh();
    if ((this.lmstargetorglevelservice.list.length / this.lmstargetorglevelssource.getPaging().perPage).toFixed(0) + 1 != this.lmstargetorglevelssource.getPaging().page)
    {
        this.lmstargetorglevelssource.setPage((this.lmstargetorglevelservice.list.length / this.lmstargetorglevelssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmstargetorglevelssource.grid.edit(this.tbllmstargetorglevelssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmstargetorglevelssource.data.indexOf(event.data);
this.onDeletelmstargetorglevel(event,event.data.targetid,((this.lmstargetorglevelssource.getPaging().page-1) *this.lmstargetorglevelssource.getPaging().perPage)+index);
this.lmstargetorglevelssource.refresh();
}
break;
}
}
lmstargetorglevelsPaging(val)
{
debugger;
this.lmstargetorglevelssource.setPaging(1, val, true);
}
onDeletelmstargetorglevel(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmstargetorglevelIDs += childID + ",";
this.lmstargetorglevelservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmstargetorglevelservice: lmstargetorglevelService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmstargetorglevelservice.DeletedlmstargetorglevelIDs = this.DeletedlmstargetorglevelIDs;
this.lmstargetorglevelservice.saveOrUpdatelmstargetorglevelsList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmstargetorglevelservice.clearList();
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
this.SetlmstargetorglevelsTableConfig();
this.lmstargetorglevelsLoadTable();
  setTimeout(() => {
  this.SetlmstargetorglevelsTableddConfig();
  });
}

populateForm(pd: lmstargetorglevel) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmstargetorglevelservice.formData = Object.assign({}, pd);
}
// 

}


}

