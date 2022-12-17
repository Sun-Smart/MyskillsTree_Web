import { lmsscoringfixedfieldspositive } from './../../../model/lmsscoringfixedfieldspositive.model';
import { lmsscoringfixedfieldspositiveService } from './../../../service/lmsscoringfixedfieldspositive.service';
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
selector: 'app-lmsscoringfixedfieldspositiveList',
templateUrl: './lmsscoringfixedfieldspositive.component.html',
styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringfixedfieldspositiveListComponent implements OnInit {
@ViewChild('tbllmsscoringfixedfieldspositivessource',{static:false}) tbllmsscoringfixedfieldspositivessource: Ng2SmartTableComponent;data3:any=[];
bfilterPopulatelmsscoringfixedfieldspositives:boolean=false;
showview:boolean=false;
theme:string="";
SESSIONUSERID: any;
sessiondata: any;
sourcekey: any;
data:any;
maindata:any;
toolbarvisible:boolean=true;
DeletedlmsscoringfixedfieldspositiveIDs: string="";
lmsscoringfixedfieldspositivesID: string = "";
lmsscoringfixedfieldspositivesselectedindex:any;
lmsscoringfixedfieldspositivessettings:any;
lmsscoringfixedfieldspositivessource: any;

showlmsscoringfixedfieldspositivesCheckbox()
{
debugger;
if(this.tbllmsscoringfixedfieldspositivessource.settings['selectMode']== 'multi')this.tbllmsscoringfixedfieldspositivessource.settings['selectMode']= 'single';
else
this.tbllmsscoringfixedfieldspositivessource.settings['selectMode']= 'multi';
this.tbllmsscoringfixedfieldspositivessource.initGrid();
}
deletelmsscoringfixedfieldspositivesAll()
{
this.tbllmsscoringfixedfieldspositivessource.settings['selectMode'] = 'single';
}
showlmsscoringfixedfieldspositivesFilter()
{
  setTimeout(() => {
  this.SetlmsscoringfixedfieldspositivesTableddConfig();
  });
      if(this.tbllmsscoringfixedfieldspositivessource.settings!=null)this.tbllmsscoringfixedfieldspositivessource.settings['hideSubHeader'] =!this.tbllmsscoringfixedfieldspositivessource.settings['hideSubHeader'];
this.tbllmsscoringfixedfieldspositivessource.initGrid();
}
showlmsscoringfixedfieldspositivesInActive()
{
}
enablelmsscoringfixedfieldspositivesInActive()
{
}
async SetlmsscoringfixedfieldspositivesTableddConfig()
{
if(!this.bfilterPopulatelmsscoringfixedfieldspositives){
}
this.bfilterPopulatelmsscoringfixedfieldspositives=true;
}
async lmsscoringfixedfieldspositivesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmsscoringfixedfieldspositivesTableConfig()
{
this.lmsscoringfixedfieldspositivessettings = {
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
value: {
title: 'Value',
type: '',
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
lmsscoringfixedfieldspositivesLoadTable(){
this.lmsscoringfixedfieldspositiveservice.getlmsscoringfixedfieldspositivesList().then((data) => {
this.lmsscoringfixedfieldspositiveservice.list=data as lmsscoringfixedfieldspositive[];
this.lmsscoringfixedfieldspositivessource=new LocalDataSource();
this.lmsscoringfixedfieldspositivessource.load(this.lmsscoringfixedfieldspositiveservice.list as any as LocalDataSource);
this.lmsscoringfixedfieldspositivessource.setPaging(1, 20, true);
});
}
lmsscoringfixedfieldspositivesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsscoringfixedfieldspositiveservice.list.length == 0)
{
    this.tbllmsscoringfixedfieldspositivessource.grid.createFormShown = true;
}
else
{
    let obj = new lmsscoringfixedfieldspositive();
    this.lmsscoringfixedfieldspositiveservice.list.push(obj);
    this.lmsscoringfixedfieldspositivessource.refresh();
    if ((this.lmsscoringfixedfieldspositiveservice.list.length / this.lmsscoringfixedfieldspositivessource.getPaging().perPage).toFixed(0) + 1 != this.lmsscoringfixedfieldspositivessource.getPaging().page)
    {
        this.lmsscoringfixedfieldspositivessource.setPage((this.lmsscoringfixedfieldspositiveservice.list.length / this.lmsscoringfixedfieldspositivessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmsscoringfixedfieldspositivessource.grid.edit(this.tbllmsscoringfixedfieldspositivessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.lmsscoringfixedfieldspositivessource.data.indexOf(event.data);
this.onDeletelmsscoringfixedfieldspositive(event,event.data.lsfpid,((this.lmsscoringfixedfieldspositivessource.getPaging().page-1) *this.lmsscoringfixedfieldspositivessource.getPaging().perPage)+index);
this.lmsscoringfixedfieldspositivessource.refresh();
}
break;
}
}
lmsscoringfixedfieldspositivesPaging(val)
{
debugger;
this.lmsscoringfixedfieldspositivessource.setPaging(1, val, true);
}
onDeletelmsscoringfixedfieldspositive(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmsscoringfixedfieldspositiveIDs += childID + ",";
this.lmsscoringfixedfieldspositiveservice.list.splice(i, 1);
}
constructor(
private nav: Location,
private router: Router,
private currentRoute: ActivatedRoute,
private lmsscoringfixedfieldspositiveservice: lmsscoringfixedfieldspositiveService,
private toastr: ToastService,
private configservice:boconfigvalueService,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
public dialogRef: DynamicDialogRef) { 
}

onSubmit(){this.lmsscoringfixedfieldspositiveservice.DeletedlmsscoringfixedfieldspositiveIDs = this.DeletedlmsscoringfixedfieldspositiveIDs;
this.lmsscoringfixedfieldspositiveservice.saveOrUpdatelmsscoringfixedfieldspositivesList().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
/*if(bclear){
this.lmsscoringfixedfieldspositiveservice.clearList();
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
this.SetlmsscoringfixedfieldspositivesTableConfig();
this.lmsscoringfixedfieldspositivesLoadTable();
  setTimeout(() => {
  this.SetlmsscoringfixedfieldspositivesTableddConfig();
  });
}

populateForm(pd: lmsscoringfixedfieldspositive) {
if(this.maindata.ScreenType==1 || this.maindata.ScreenType==2)
{
this.dialogRef.close(pd);
}
else
{
this.lmsscoringfixedfieldspositiveservice.formData = Object.assign({}, pd);
}
// 

}


}

