import { lmstargetuserlevel } from './../../../model/lmstargetuserlevel.model';
import { lmstargetuserlevelService } from './../../../service/lmstargetuserlevel.service';
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
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';


@Component({
selector: 'app-lmstargetuserlevelList',
templateUrl: './lmstargetuserlevel.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetuserlevelListComponent implements OnInit {
@ViewChild('tbllmstargetuserlevelssource',{static:false}) tbllmstargetuserlevelssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmstargetuserlevels:boolean=false;
datalmstargetuserlevelsbranchid3:any=[];
datalmstargetuserlevelsuserid3:any=[];
datalmstargetuserlevelsterm3:any=[];
datalmstargetuserlevelsproductgroupid3:any=[];
datalmstargetuserlevelsperformancestatus3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmstargetuserlevelIDs: string="";
lmstargetuserlevelsID: string = "";
lmstargetuserlevelsselectedindex:any;
lmstargetuserlevelssettings:any;
lmstargetuserlevelssource: any;

showlmstargetuserlevelsCheckbox()
{
debugger;
if(this.tbllmstargetuserlevelssource.settings['selectMode']== 'multi')this.tbllmstargetuserlevelssource.settings['selectMode']= 'single';
else
this.tbllmstargetuserlevelssource.settings['selectMode']= 'multi';
this.tbllmstargetuserlevelssource.initGrid();
}
deletelmstargetuserlevelsAll()
{
this.tbllmstargetuserlevelssource.settings['selectMode'] = 'single';
}
showlmstargetuserlevelsFilter()
{
  setTimeout(() => {
  this.SetlmstargetuserlevelsTableddConfig();
  });
      if(this.tbllmstargetuserlevelssource.settings!=null)this.tbllmstargetuserlevelssource.settings['hideSubHeader'] =!this.tbllmstargetuserlevelssource.settings['hideSubHeader'];
this.tbllmstargetuserlevelssource.initGrid();
}
showlmstargetuserlevelsInActive()
{
}
enablelmstargetuserlevelsInActive()
{
}
async SetlmstargetuserlevelsTableddConfig()
{
if(!this.bfilterPopulatelmstargetuserlevels){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetuserlevelsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datalmstargetuserlevelsbranchid3.push(obj);
}
if((this.tbllmstargetuserlevelssource.settings as any).columns['branchid'])
{
(this.tbllmstargetuserlevelssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetuserlevelsbranchid3));
this.tbllmstargetuserlevelssource.initGrid();
}
});

this.bousermasterservice.getbousermastersList().then(res=>
{
var datauserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetuserlevelsuserid3.push(defaultobj);
for(let i=0; i<datauserid2.length; i++){
var obj= { value: datauserid2[i].userid, title:datauserid2[i].username};
this.datalmstargetuserlevelsuserid3.push(obj);
}
if((this.tbllmstargetuserlevelssource.settings as any).columns['userid'])
{
(this.tbllmstargetuserlevelssource.settings as any).columns['userid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetuserlevelsuserid3));
this.tbllmstargetuserlevelssource.initGrid();
}
});

this.configservice.getList("term").then(res=>
{
var dataterm2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetuserlevelsterm3.push(defaultobj);
for(let i=0; i<dataterm2.length; i++){
var obj= { value: dataterm2[i].configkey, title: dataterm2[i].configtext};
this.datalmstargetuserlevelsterm3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetuserlevelssource.settings);
if(clone.columns['term']!=undefined)clone.columns['term'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetuserlevelsterm3)), }, };
if(clone.columns['term']!=undefined)clone.columns['term'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetuserlevelsterm3)), }, };
this.tbllmstargetuserlevelssource.settings =  clone;
this.tbllmstargetuserlevelssource.initGrid();
});

this.bomasterdataservice.getList("kft5a").then(res=>
{
var dataproductgroupid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetuserlevelsproductgroupid3.push(defaultobj);
for(let i=0; i<dataproductgroupid2.length; i++){
var obj= { value: dataproductgroupid2[i].masterdataid, title:dataproductgroupid2[i].masterdatadescription};
this.datalmstargetuserlevelsproductgroupid3.push(obj);
}
if((this.tbllmstargetuserlevelssource.settings as any).columns['productgroupid'])
{
(this.tbllmstargetuserlevelssource.settings as any).columns['productgroupid'].editor.config.list=JSON.parse(JSON.stringify(this.datalmstargetuserlevelsproductgroupid3));
this.tbllmstargetuserlevelssource.initGrid();
}
});

this.configservice.getList("performancestatus").then(res=>
{
var dataperformancestatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datalmstargetuserlevelsperformancestatus3.push(defaultobj);
for(let i=0; i<dataperformancestatus2.length; i++){
var obj= { value: dataperformancestatus2[i].configkey, title: dataperformancestatus2[i].configtext};
this.datalmstargetuserlevelsperformancestatus3.push(obj);
}
var clone = this.sharedService.clone(this.tbllmstargetuserlevelssource.settings);
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetuserlevelsperformancestatus3)), }, };
if(clone.columns['performancestatus']!=undefined)clone.columns['performancestatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datalmstargetuserlevelsperformancestatus3)), }, };
this.tbllmstargetuserlevelssource.settings =  clone;
this.tbllmstargetuserlevelssource.initGrid();
});
}
this.bfilterPopulatelmstargetuserlevels=true;
}
async lmstargetuserlevelsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmstargetuserlevelsTableConfig()
{
this.lmstargetuserlevelssettings = {
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
var element= this.datalmstargetuserlevelsbranchid3.find(c=>c.value==cell);
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
var element= this.datalmstargetuserlevelsuserid3.find(c=>c.value==cell);
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
var element= this.datalmstargetuserlevelsterm3.find(c=>c.value==cell);
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
var element= this.datalmstargetuserlevelsproductgroupid3.find(c=>c.value==cell);
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
var element= this.datalmstargetuserlevelsperformancestatus3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
lmstargetuserlevelsLoadTable(){
this.lmstargetuserlevelservice.getlmstargetuserlevelsList().then((data) => {
this.lmstargetuserlevelservice.list=data as lmstargetuserlevel[];
this.lmstargetuserlevelssource=new LocalDataSource();
this.lmstargetuserlevelssource.load(this.lmstargetuserlevelservice.list as any as LocalDataSource);
this.lmstargetuserlevelssource.setPaging(1, 20, true);
});
}
lmstargetuserlevelsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmstargetuserlevelservice.list.length == 0)
{
    this.tbllmstargetuserlevelssource.grid.createFormShown = true;
}
else
{
    let obj = new lmstargetuserlevel();
    this.lmstargetuserlevelservice.list.push(obj);
    this.lmstargetuserlevelssource.refresh();
    if ((this.lmstargetuserlevelservice.list.length / this.lmstargetuserlevelssource.getPaging().perPage).toFixed(0) + 1 != this.lmstargetuserlevelssource.getPaging().page)
    {
        this.lmstargetuserlevelssource.setPage((this.lmstargetuserlevelservice.list.length / this.lmstargetuserlevelssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmstargetuserlevelssource.grid.edit(this.tbllmstargetuserlevelssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmstargetuserlevelssource.data.indexOf(event.data);
this.onDeletelmstargetuserlevel(event,event.data.targetid,((this.lmstargetuserlevelssource.getPaging().page-1) *this.lmstargetuserlevelssource.getPaging().perPage)+index);
this.lmstargetuserlevelssource.refresh();
}
break;
}
}
lmstargetuserlevelsPaging(val)
{
debugger;
this.lmstargetuserlevelssource.setPaging(1, val, true);
}
onDeletelmstargetuserlevel(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmstargetuserlevelIDs += childID + ",";
this.lmstargetuserlevelservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmstargetuserlevelservice: lmstargetuserlevelService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bousermasterservice:bousermasterService,
private bomasterdataservice:bomasterdataService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmstargetuserlevelservice.DeletedlmstargetuserlevelIDs = this.DeletedlmstargetuserlevelIDs;
this.lmstargetuserlevelservice.saveOrUpdatelmstargetuserlevelsList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmstargetuserlevelservice.clearList();
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
this.SetlmstargetuserlevelsTableConfig();
this.lmstargetuserlevelsLoadTable();
  setTimeout(() => {
  this.SetlmstargetuserlevelsTableddConfig();
  });
}

populateForm(pd: lmstargetuserlevel) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmstargetuserlevelservice.formData = Object.assign({}, pd);
}
// 

}


}

