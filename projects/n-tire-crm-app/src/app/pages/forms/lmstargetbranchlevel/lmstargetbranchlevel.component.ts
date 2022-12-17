import { lmstargetbranchlevel } from './../../../model/lmstargetbranchlevel.model';
import { lmstargetbranchlevelService } from './../../../service/lmstargetbranchlevel.service';
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
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';


@Component({
selector: 'app-lmstargetbranchlevelList',
templateUrl: './lmstargetbranchlevel.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetbranchlevelListComponent implements OnInit {
@ViewChild('tbllmstargetbranchlevelssource',{static:false}) tbllmstargetbranchlevelssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmstargetbranchlevels:boolean=false;
datalmstargetbranchlevelsbranchid3:any=[];
datalmstargetbranchlevelsterm3:any=[];
datalmstargetbranchlevelsproductgroupid3:any=[];
datalmstargetbranchlevelsperformancestatus3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmstargetbranchlevelIDs: string="";
lmstargetbranchlevelsID: string = "";
lmstargetbranchlevelsselectedindex:any;
lmstargetbranchlevelssettings:any;
lmstargetbranchlevelssource: any;

showlmstargetbranchlevelsCheckbox()
{
debugger;
if(this.tbllmstargetbranchlevelssource.settings['selectMode']== 'multi')this.tbllmstargetbranchlevelssource.settings['selectMode']= 'single';
else
this.tbllmstargetbranchlevelssource.settings['selectMode']= 'multi';
this.tbllmstargetbranchlevelssource.initGrid();
}
deletelmstargetbranchlevelsAll()
{
this.tbllmstargetbranchlevelssource.settings['selectMode'] = 'single';
}
showlmstargetbranchlevelsFilter()
{
  setTimeout(() => {
  this.SetlmstargetbranchlevelsTableddConfig();
  });
      if(this.tbllmstargetbranchlevelssource.settings!=null)this.tbllmstargetbranchlevelssource.settings['hideSubHeader'] =!this.tbllmstargetbranchlevelssource.settings['hideSubHeader'];
this.tbllmstargetbranchlevelssource.initGrid();
}
showlmstargetbranchlevelsInActive()
{
}
enablelmstargetbranchlevelsInActive()
{
}
async SetlmstargetbranchlevelsTableddConfig()
{
if(!this.bfilterPopulatelmstargetbranchlevels){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetbranchlevelsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datalmstargetbranchlevelsbranchid3.push(obj);
}
if((this.tbllmstargetbranchlevelssource.settings as any).columns['branchid'])
{
(this.tbllmstargetbranchlevelssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsbranchid3));
this.tbllmstargetbranchlevelssource.initGrid();
}
});

this.configservice.getList("term").then(res=>
{
var dataterm2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetbranchlevelsterm3.push(defaultobj);
for(let i=0; i<dataterm2.length; i++){
var obj= { value: dataterm2[i].configkey, title: dataterm2[i].configtext};
this.datalmstargetbranchlevelsterm3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetbranchlevelssource.settings);
if(clone.columns['term']!=undefined)clone.columns['term'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsterm3)), }, };
if(clone.columns['term']!=undefined)clone.columns['term'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsterm3)), }, };
this.tbllmstargetbranchlevelssource.settings =  clone;
this.tbllmstargetbranchlevelssource.initGrid();
});

this.bomasterdataservice.getList("kft5a").then(res=>
{
var dataproductgroupid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetbranchlevelsproductgroupid3.push(defaultobj);
for(let i=0; i<dataproductgroupid2.length; i++){
var obj= { value: dataproductgroupid2[i].masterdataid, title:dataproductgroupid2[i].masterdatadescription};
this.datalmstargetbranchlevelsproductgroupid3.push(obj);
}
if((this.tbllmstargetbranchlevelssource.settings as any).columns['productgroupid'])
{
(this.tbllmstargetbranchlevelssource.settings as any).columns['productgroupid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsproductgroupid3));
this.tbllmstargetbranchlevelssource.initGrid();
}
});

this.configservice.getList("performancestatus").then(res=>
{
var dataperformancestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetbranchlevelsperformancestatus3.push(defaultobj);
for(let i=0; i<dataperformancestatus2.length; i++){
var obj= { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext};
this.datalmstargetbranchlevelsperformancestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetbranchlevelssource.settings);
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsperformancestatus3)), }, };
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetbranchlevelsperformancestatus3)), }, };
this.tbllmstargetbranchlevelssource.settings =  clone;
this.tbllmstargetbranchlevelssource.initGrid();
});
}
this.bfilterPopulatelmstargetbranchlevels=true;
}
async lmstargetbranchlevelsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmstargetbranchlevelsTableConfig()
{
this.lmstargetbranchlevelssettings = {
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
branchid: {
title: 'Branch',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'bxg94',reportcode:'bxg94',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datalmstargetbranchlevelsbranchid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
term: {
title: 'Term',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datalmstargetbranchlevelsterm3.find(c=>c.value==cell);
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
var element= this.datalmstargetbranchlevelsproductgroupid3.find(c=>c.value==cell);
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
var element= this.datalmstargetbranchlevelsperformancestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
lmstargetbranchlevelsLoadTable(){
this.lmstargetbranchlevelservice.getlmstargetbranchlevelsList().then((data) => {
this.lmstargetbranchlevelservice.list=data as lmstargetbranchlevel[];
this.lmstargetbranchlevelssource=new LocalDataSource();
this.lmstargetbranchlevelssource.load(this.lmstargetbranchlevelservice.list as any as LocalDataSource);
this.lmstargetbranchlevelssource.setPaging(1, 20, true);
});
}
lmstargetbranchlevelsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmstargetbranchlevelservice.list.length == 0)
{
    this.tbllmstargetbranchlevelssource.grid.createFormShown = true;
}
else
{
    let obj = new lmstargetbranchlevel();
    this.lmstargetbranchlevelservice.list.push(obj);
    this.lmstargetbranchlevelssource.refresh();
    if ((this.lmstargetbranchlevelservice.list.length / this.lmstargetbranchlevelssource.getPaging().perPage).toFixed(0) + 1 != this.lmstargetbranchlevelssource.getPaging().page)
    {
        this.lmstargetbranchlevelssource.setPage((this.lmstargetbranchlevelservice.list.length / this.lmstargetbranchlevelssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmstargetbranchlevelssource.grid.edit(this.tbllmstargetbranchlevelssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmstargetbranchlevelssource.data.indexOf(event.data);
this.onDeletelmstargetbranchlevel(event,event.data.targetid,((this.lmstargetbranchlevelssource.getPaging().page-1) *this.lmstargetbranchlevelssource.getPaging().perPage)+index);
this.lmstargetbranchlevelssource.refresh();
}
break;
}
}
lmstargetbranchlevelsPaging(val)
{
debugger;
this.lmstargetbranchlevelssource.setPaging(1, val, true);
}
onDeletelmstargetbranchlevel(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmstargetbranchlevelIDs += childID + ",";
this.lmstargetbranchlevelservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmstargetbranchlevelservice: lmstargetbranchlevelService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bomasterdataservice:bomasterdataService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmstargetbranchlevelservice.DeletedlmstargetbranchlevelIDs = this.DeletedlmstargetbranchlevelIDs;
this.lmstargetbranchlevelservice.saveOrUpdatelmstargetbranchlevelsList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmstargetbranchlevelservice.clearList();
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
this.SetlmstargetbranchlevelsTableConfig();
this.lmstargetbranchlevelsLoadTable();
  setTimeout(() => {
  this.SetlmstargetbranchlevelsTableddConfig();
  });
}

populateForm(pd: lmstargetbranchlevel) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmstargetbranchlevelservice.formData = Object.assign({}, pd);
}
// 

}


}

