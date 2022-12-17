import { lmsscoringplannedclosedate } from './../../../model/lmsscoringplannedclosedate.model';
import { lmsscoringplannedclosedateService } from './../../../service/lmsscoringplannedclosedate.service';
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


@Component({
selector: 'app-lmsscoringplannedclosedateList',
templateUrl: './lmsscoringplannedclosedate.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringplannedclosedateListComponent implements OnInit {
@ViewChild('tbllmsscoringplannedclosedatessource',{static:false}) tbllmsscoringplannedclosedatessource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmsscoringplannedclosedates:boolean=false;
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmsscoringplannedclosedateIDs: string="";
lmsscoringplannedclosedatesID: string = "";
lmsscoringplannedclosedatesselectedindex:any;
lmsscoringplannedclosedatessettings:any;
lmsscoringplannedclosedatessource: any;

showlmsscoringplannedclosedatesCheckbox()
{
debugger;
if(this.tbllmsscoringplannedclosedatessource.settings['selectMode']== 'multi')this.tbllmsscoringplannedclosedatessource.settings['selectMode']= 'single';
else
this.tbllmsscoringplannedclosedatessource.settings['selectMode']= 'multi';
this.tbllmsscoringplannedclosedatessource.initGrid();
}
deletelmsscoringplannedclosedatesAll()
{
this.tbllmsscoringplannedclosedatessource.settings['selectMode'] = 'single';
}
showlmsscoringplannedclosedatesFilter()
{
  setTimeout(() => {
  this.SetlmsscoringplannedclosedatesTableddConfig();
  });
      if(this.tbllmsscoringplannedclosedatessource.settings!=null)this.tbllmsscoringplannedclosedatessource.settings['hideSubHeader'] =!this.tbllmsscoringplannedclosedatessource.settings['hideSubHeader'];
this.tbllmsscoringplannedclosedatessource.initGrid();
}
showlmsscoringplannedclosedatesInActive()
{
}
enablelmsscoringplannedclosedatesInActive()
{
}
async SetlmsscoringplannedclosedatesTableddConfig()
{
if(!this.bfilterPopulatelmsscoringplannedclosedates){
}
this.bfilterPopulatelmsscoringplannedclosedates=true;
}
async lmsscoringplannedclosedatesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsscoringplannedclosedatesTableConfig()
{
this.lmsscoringplannedclosedatessettings = {
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
productgroupid: {
title: 'Product Group',
type: 'number',
filter:true,
},
days: {
title: 'Days',
type: 'number',
filter:true,
},
point: {
title: 'Point',
type: 'number',
filter:true,
},
},
};
}
lmsscoringplannedclosedatesLoadTable(){
this.lmsscoringplannedclosedateservice.getlmsscoringplannedclosedatesList().then((data) => {
this.lmsscoringplannedclosedateservice.list=data as lmsscoringplannedclosedate[];
this.lmsscoringplannedclosedatessource=new LocalDataSource();
this.lmsscoringplannedclosedatessource.load(this.lmsscoringplannedclosedateservice.list as any as LocalDataSource);
this.lmsscoringplannedclosedatessource.setPaging(1, 20, true);
});
}
lmsscoringplannedclosedatesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsscoringplannedclosedateservice.list.length == 0)
{
    this.tbllmsscoringplannedclosedatessource.grid.createFormShown = true;
}
else
{
    let obj = new lmsscoringplannedclosedate();
    this.lmsscoringplannedclosedateservice.list.push(obj);
    this.lmsscoringplannedclosedatessource.refresh();
    if ((this.lmsscoringplannedclosedateservice.list.length / this.lmsscoringplannedclosedatessource.getPaging().perPage).toFixed(0) + 1 != this.lmsscoringplannedclosedatessource.getPaging().page)
    {
        this.lmsscoringplannedclosedatessource.setPage((this.lmsscoringplannedclosedateservice.list.length / this.lmsscoringplannedclosedatessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsscoringplannedclosedatessource.grid.edit(this.tbllmsscoringplannedclosedatessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmsscoringplannedclosedatessource.data.indexOf(event.data);
this.onDeletelmsscoringplannedclosedate(event,event.data.lspcid,((this.lmsscoringplannedclosedatessource.getPaging().page-1) *this.lmsscoringplannedclosedatessource.getPaging().perPage)+index);
this.lmsscoringplannedclosedatessource.refresh();
}
break;
}
}
lmsscoringplannedclosedatesPaging(val)
{
debugger;
this.lmsscoringplannedclosedatessource.setPaging(1, val, true);
}
onDeletelmsscoringplannedclosedate(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsscoringplannedclosedateIDs += childID + ",";
this.lmsscoringplannedclosedateservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmsscoringplannedclosedateservice: lmsscoringplannedclosedateService,
private toastr: ToastService,
private configservice:boconfigvalueService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmsscoringplannedclosedateservice.DeletedlmsscoringplannedclosedateIDs = this.DeletedlmsscoringplannedclosedateIDs;
this.lmsscoringplannedclosedateservice.saveOrUpdatelmsscoringplannedclosedatesList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmsscoringplannedclosedateservice.clearList();
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
this.SetlmsscoringplannedclosedatesTableConfig();
this.lmsscoringplannedclosedatesLoadTable();
  setTimeout(() => {
  this.SetlmsscoringplannedclosedatesTableddConfig();
  });
}

populateForm(pd: lmsscoringplannedclosedate) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmsscoringplannedclosedateservice.formData = Object.assign({}, pd);
}
// 

}


}

