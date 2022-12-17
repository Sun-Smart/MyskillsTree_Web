import { erpfacostcategoryglmapping } from './../../../model/erpfacostcategoryglmapping.model';
import { erpfacostcategoryglmappingService } from './../../../service/erpfacostcategoryglmapping.service';
import { Component, OnInit , Inject,Optional, ViewChild} from '@angular/core';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { erpfacostcenterService } from './../../../service/erpfacostcenter.service';
import { erpfaaccountmasterService } from './../../../service/erpfaaccountmaster.service';


@Component({
selector: 'app-erpfacostcategoryglmappingList',
templateUrl: './erpfacostcategoryglmapping.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class erpfacostcategoryglmappingListComponent implements OnInit {
@ViewChild('tblerpfacostcategoryglmappingssource',{static:false}) tblerpfacostcategoryglmappingssource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulateerpfacostcategoryglmappings:boolean=false;
dataerpfacostcategoryglmappingsccid3:any=[];
dataerpfacostcategoryglmappingsglid3:any=[];
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
data:any;
toolbarvisible:boolean=true;
DeletederpfacostcategoryglmappingIDs: string="";
erpfacostcategoryglmappingsID: string = "";
erpfacostcategoryglmappingsselectedindex:any;
erpfacostcategoryglmappingssettings:any;
erpfacostcategoryglmappingssource: any;

showerpfacostcategoryglmappingsCheckbox()
{
debugger;
if(this.tblerpfacostcategoryglmappingssource.settings['selectMode']== 'multi')this.tblerpfacostcategoryglmappingssource.settings['selectMode']= 'single';
else
this.tblerpfacostcategoryglmappingssource.settings['selectMode']= 'multi';
this.tblerpfacostcategoryglmappingssource.initGrid();
}
deleteerpfacostcategoryglmappingsAll()
{
this.tblerpfacostcategoryglmappingssource.settings['selectMode'] = 'single';
}
showerpfacostcategoryglmappingsFilter()
{
  setTimeout(() => {
  this.SeterpfacostcategoryglmappingsTableddConfig();
  });
      if(this.tblerpfacostcategoryglmappingssource.settings!=null)this.tblerpfacostcategoryglmappingssource.settings['hideSubHeader'] =!this.tblerpfacostcategoryglmappingssource.settings['hideSubHeader'];
this.tblerpfacostcategoryglmappingssource.initGrid();
}
showerpfacostcategoryglmappingsInActive()
{
}
enableerpfacostcategoryglmappingsInActive()
{
}
async SeterpfacostcategoryglmappingsTableddConfig()
{
if(!this.bfilterPopulateerpfacostcategoryglmappings){

this.erpfacostcenterservice.geterpfacostcentersList().then(res=>
{
var dataccid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfacostcategoryglmappingsccid3.push(defaultobj);
for(let i=0; i<dataccid2.length; i++){
var obj= { value: dataccid2[i].costcenterid, title:dataccid2[i].costcentername};
this.dataerpfacostcategoryglmappingsccid3.push(obj);
}
if((this.tblerpfacostcategoryglmappingssource.settings as any).columns['ccid'])
{
(this.tblerpfacostcategoryglmappingssource.settings as any).columns['ccid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpfacostcategoryglmappingsccid3));
this.tblerpfacostcategoryglmappingssource.initGrid();
}
});

this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res=>
{
var dataglid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfacostcategoryglmappingsglid3.push(defaultobj);
for(let i=0; i<dataglid2.length; i++){
var obj= { value: dataglid2[i].accountid, title:dataglid2[i].accountname};
this.dataerpfacostcategoryglmappingsglid3.push(obj);
}
if((this.tblerpfacostcategoryglmappingssource.settings as any).columns['glid'])
{
(this.tblerpfacostcategoryglmappingssource.settings as any).columns['glid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpfacostcategoryglmappingsglid3));
this.tblerpfacostcategoryglmappingssource.initGrid();
}
});
}
this.bfilterPopulateerpfacostcategoryglmappings=true;
}
async erpfacostcategoryglmappingsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpfacostcategoryglmappingsTableConfig()
{
this.erpfacostcategoryglmappingssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
ccid: {
title: 'C C',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfacostcategoryglmappingsccid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
glid: {
title: 'G L',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'oo2ro',reportcode:'oo2ro',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfacostcategoryglmappingsglid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
erpfacostcategoryglmappingsLoadTable(){
this.erpfacostcategoryglmappingservice.geterpfacostcategoryglmappingsList().then((data) => {
this.erpfacostcategoryglmappingservice.list=data as erpfacostcategoryglmapping[];
this.erpfacostcategoryglmappingssource=new LocalDataSource();
this.erpfacostcategoryglmappingssource.load(this.erpfacostcategoryglmappingservice.list as any as LocalDataSource);
this.erpfacostcategoryglmappingssource.setPaging(1, 20, true);
});
}
erpfacostcategoryglmappingsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpfacostcategoryglmappingservice.list.length == 0)
{
    this.tblerpfacostcategoryglmappingssource.grid.createFormShown = true;
}
else
{
    let obj = new erpfacostcategoryglmapping();
    this.erpfacostcategoryglmappingservice.list.push(obj);
    this.erpfacostcategoryglmappingssource.refresh();
    if ((this.erpfacostcategoryglmappingservice.list.length / this.erpfacostcategoryglmappingssource.getPaging().perPage).toFixed(0) + 1 != this.erpfacostcategoryglmappingssource.getPaging().page)
    {
        this.erpfacostcategoryglmappingssource.setPage((this.erpfacostcategoryglmappingservice.list.length / this.erpfacostcategoryglmappingssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpfacostcategoryglmappingssource.grid.edit(this.tblerpfacostcategoryglmappingssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.erpfacostcategoryglmappingssource.data.indexOf(event.data);
this.onDeleteerpfacostcategoryglmapping(event,event.data.mapid,((this.erpfacostcategoryglmappingssource.getPaging().page-1) *this.erpfacostcategoryglmappingssource.getPaging().perPage)+index);
this.erpfacostcategoryglmappingssource.refresh();
}
break;
}
}
erpfacostcategoryglmappingsPaging(val)
{
debugger;
this.erpfacostcategoryglmappingssource.setPaging(1, val, true);
}
onDeleteerpfacostcategoryglmapping(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfacostcategoryglmappingIDs += childID + ",";
this.erpfacostcategoryglmappingservice.list.splice(i, 1);
}
constructor(
private router: Router,
private currentRoute: ActivatedRoute,
private erpfacostcategoryglmappingservice: erpfacostcategoryglmappingService,
private toastr: ToastService,
private configservice:boconfigvalueService,
private erpfacostcenterservice:erpfacostcenterService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.erpfacostcategoryglmappingservice.DeletederpfacostcategoryglmappingIDs = this.DeletederpfacostcategoryglmappingIDs;
this.erpfacostcategoryglmappingservice.saveOrUpdateerpfacostcategoryglmappingsList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
/*if(bclear){
this.erpfacostcategoryglmappingservice.clearList();
this.resetForm();
}*/
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
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
 if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.showview=true;
}
this.theme=this.sessionService.getItem('selected-theme');
this.SeterpfacostcategoryglmappingsTableConfig();
this.erpfacostcategoryglmappingsLoadTable();
  setTimeout(() => {
  this.SeterpfacostcategoryglmappingsTableddConfig();
  });
}

populateForm(pd: erpfacostcategoryglmapping) {
if(this.data.ScreenType==1 || this.data.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.erpfacostcategoryglmappingservice.formData = Object.assign({}, pd);
}
// 

}


}

