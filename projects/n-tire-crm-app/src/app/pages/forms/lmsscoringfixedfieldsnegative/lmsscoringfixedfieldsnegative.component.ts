import { lmsscoringfixedfieldsnegative } from './../../../model/lmsscoringfixedfieldsnegative.model';
import { lmsscoringfixedfieldsnegativeService } from './../../../service/lmsscoringfixedfieldsnegative.service';
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
selector: 'app-lmsscoringfixedfieldsnegativeList',
templateUrl: './lmsscoringfixedfieldsnegative.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringfixedfieldsnegativeListComponent implements OnInit {
@ViewChild('tbllmsscoringfixedfieldsnegativessource',{static:false}) tbllmsscoringfixedfieldsnegativessource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmsscoringfixedfieldsnegatives:boolean=false;
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmsscoringfixedfieldsnegativeIDs: string="";
lmsscoringfixedfieldsnegativesID: string = "";
lmsscoringfixedfieldsnegativesselectedindex:any;
lmsscoringfixedfieldsnegativessettings:any;
lmsscoringfixedfieldsnegativessource: any;

showlmsscoringfixedfieldsnegativesCheckbox()
{
debugger;
if(this.tbllmsscoringfixedfieldsnegativessource.settings['selectMode']== 'multi')this.tbllmsscoringfixedfieldsnegativessource.settings['selectMode']= 'single';
else
this.tbllmsscoringfixedfieldsnegativessource.settings['selectMode']= 'multi';
this.tbllmsscoringfixedfieldsnegativessource.initGrid();
}
deletelmsscoringfixedfieldsnegativesAll()
{
this.tbllmsscoringfixedfieldsnegativessource.settings['selectMode'] = 'single';
}
showlmsscoringfixedfieldsnegativesFilter()
{
  setTimeout(() => {
  this.SetlmsscoringfixedfieldsnegativesTableddConfig();
  });
      if(this.tbllmsscoringfixedfieldsnegativessource.settings!=null)this.tbllmsscoringfixedfieldsnegativessource.settings['hideSubHeader'] =!this.tbllmsscoringfixedfieldsnegativessource.settings['hideSubHeader'];
this.tbllmsscoringfixedfieldsnegativessource.initGrid();
}
showlmsscoringfixedfieldsnegativesInActive()
{
}
enablelmsscoringfixedfieldsnegativesInActive()
{
}
async SetlmsscoringfixedfieldsnegativesTableddConfig()
{
if(!this.bfilterPopulatelmsscoringfixedfieldsnegatives){
}
this.bfilterPopulatelmsscoringfixedfieldsnegatives=true;
}
async lmsscoringfixedfieldsnegativesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsscoringfixedfieldsnegativesTableConfig()
{
this.lmsscoringfixedfieldsnegativessettings = {
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
field: {
title: 'Field',
type: '',
filter:true,
},
fromvalue: {
title: 'From Value',
type: '',
filter:true,
},
tovalue: {
title: 'To Value',
type: '',
filter:true,
},
negativepoints: {
title: 'Negative Points',
type: 'number',
filter:true,
},
},
};
}
lmsscoringfixedfieldsnegativesLoadTable(){
this.lmsscoringfixedfieldsnegativeservice.getlmsscoringfixedfieldsnegativesList().then((data) => {
this.lmsscoringfixedfieldsnegativeservice.list=data as lmsscoringfixedfieldsnegative[];
this.lmsscoringfixedfieldsnegativessource=new LocalDataSource();
this.lmsscoringfixedfieldsnegativessource.load(this.lmsscoringfixedfieldsnegativeservice.list as any as LocalDataSource);
this.lmsscoringfixedfieldsnegativessource.setPaging(1, 20, true);
});
}
lmsscoringfixedfieldsnegativesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsscoringfixedfieldsnegativeservice.list.length == 0)
{
    this.tbllmsscoringfixedfieldsnegativessource.grid.createFormShown = true;
}
else
{
    let obj = new lmsscoringfixedfieldsnegative();
    this.lmsscoringfixedfieldsnegativeservice.list.push(obj);
    this.lmsscoringfixedfieldsnegativessource.refresh();
    if ((this.lmsscoringfixedfieldsnegativeservice.list.length / this.lmsscoringfixedfieldsnegativessource.getPaging().perPage).toFixed(0) + 1 != this.lmsscoringfixedfieldsnegativessource.getPaging().page)
    {
        this.lmsscoringfixedfieldsnegativessource.setPage((this.lmsscoringfixedfieldsnegativeservice.list.length / this.lmsscoringfixedfieldsnegativessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsscoringfixedfieldsnegativessource.grid.edit(this.tbllmsscoringfixedfieldsnegativessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmsscoringfixedfieldsnegativessource.data.indexOf(event.data);
this.onDeletelmsscoringfixedfieldsnegative(event,event.data.lsfnid,((this.lmsscoringfixedfieldsnegativessource.getPaging().page-1) *this.lmsscoringfixedfieldsnegativessource.getPaging().perPage)+index);
this.lmsscoringfixedfieldsnegativessource.refresh();
}
break;
}
}
lmsscoringfixedfieldsnegativesPaging(val)
{
debugger;
this.lmsscoringfixedfieldsnegativessource.setPaging(1, val, true);
}
onDeletelmsscoringfixedfieldsnegative(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsscoringfixedfieldsnegativeIDs += childID + ",";
this.lmsscoringfixedfieldsnegativeservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmsscoringfixedfieldsnegativeservice: lmsscoringfixedfieldsnegativeService,
private toastr: ToastService,
private configservice:boconfigvalueService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmsscoringfixedfieldsnegativeservice.DeletedlmsscoringfixedfieldsnegativeIDs = this.DeletedlmsscoringfixedfieldsnegativeIDs;
this.lmsscoringfixedfieldsnegativeservice.saveOrUpdatelmsscoringfixedfieldsnegativesList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmsscoringfixedfieldsnegativeservice.clearList();
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
this.SetlmsscoringfixedfieldsnegativesTableConfig();
this.lmsscoringfixedfieldsnegativesLoadTable();
  setTimeout(() => {
  this.SetlmsscoringfixedfieldsnegativesTableddConfig();
  });
}

populateForm(pd: lmsscoringfixedfieldsnegative) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmsscoringfixedfieldsnegativeservice.formData = Object.assign({}, pd);
}
// 

}


}

