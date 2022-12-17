import { hlpservicecontinuityplanService } from './../../../service/hlpservicecontinuityplan.service';
import { hlpservicecontinuityplan } from './../../../model/hlpservicecontinuityplan.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { hlpservicecontinuityplandetail } from './../../../model/hlpservicecontinuityplandetail.model';
import { hlpservicecontinuityplandetailComponent } from './../../../pages/forms/hlpservicecontinuityplandetail/hlpservicecontinuityplandetail.component';
//FK services
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-hlpservicecontinuityplan',
templateUrl: './hlpservicecontinuityplan.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hlpservicecontinuityplanComponent implements OnInit {
hidelist:any=[];
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
//formdata: any;//current form data
shortcuts: ShortcutInput[] = [];//keyboard keys
showsubmit: boolean = true;//button to show
showGoWorkFlow: boolean = false;
pkList:any;//stores values - used in search, prev, next
pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
pk_tblForm: FormGroup;//pk - autocomplete
pk_tbloptions: any;//pk - autocomplete
pk_tblformatter: any;//pk - autocomplete
toolbarvisible:boolean=true;
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulatehlpservicecontinuityplans:boolean=false;
datahlpservicecontinuityplandetailscategory3:any=[];
bfilterPopulatehlpservicecontinuityplandetails:boolean=false;
@ViewChild('tblhlpservicecontinuityplandetailssource',{static:false}) tblhlpservicecontinuityplandetailssource: Ng2SmartTableComponent;
 hlpservicecontinuityplanForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hlpservicecontinuityplanshowOption:boolean;
hlpservicecontinuityplandetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hlpservicecontinuityplandetailsvisiblelist:any;
hlpservicecontinuityplandetailshidelist:any;

DeletedhlpservicecontinuityplandetailIDs: string="";
hlpservicecontinuityplandetailsID: string = "1";
hlpservicecontinuityplandetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hlpservicecontinuityplanservice: hlpservicecontinuityplanService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private currentRoute: ActivatedRoute) { 
this.translate=this.sharedService.translate;
this.data = dynamicconfig;
this.pmenuid=sharedService.menuid;
this.pcurrenturl=sharedService.currenturl;
this.keyboard.add([
{
        key: 'cmd l',
    command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
    preventDefault: true
},
{
        key: 'cmd s',
    command: () => this.onSubmitData(false),
    preventDefault: true
},
{
        key: 'cmd f',
    command: () => this.resetForm(),
    preventDefault: true
}
]);
this.hlpservicecontinuityplanForm  = this.fb.group({
pk:[null],
planid: [null],
introduction: [null],
purpose: [null],
scope: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hlpservicecontinuityplanForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hlpservicecontinuityplanForm.dirty && this.hlpservicecontinuityplanForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields

//navigation buttons
first()
{
  if(this.pkList.length>0) this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
 if(this.pkList.length>0) this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.planid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.planid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.planid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');
this.viewhtml=this.sessionService.getViewHtml();

debugger;
//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let hlpservicecontinuityplanid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
}
else if(this.data!=null && this.data.pkcol!=null)
{
this.pkcol=this.data.pkcol;
}
else
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('id');
this.showformtype  = this.currentRoute.snapshot.paramMap.get('showformtype');
}
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=hlpservicecontinuityplanid;
//this.sharedService.alert(hlpservicecontinuityplanid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethlpservicecontinuityplandetailsTableConfig();
  setTimeout(() => {
  this.SethlpservicecontinuityplandetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hlpservicecontinuityplanservice.gethlpservicecontinuityplansList().then(res => {
      this.pkList = res as hlpservicecontinuityplan[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.hlpservicecontinuityplanForm.markAsUntouched();
this.hlpservicecontinuityplanForm.markAsPristine();
}



resetForm() {
if (this.hlpservicecontinuityplanForm != null)
this.hlpservicecontinuityplanForm.reset();
this.hlpservicecontinuityplanForm.patchValue({
});
setTimeout(() => {
this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails=[];
this.hlpservicecontinuityplandetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let planid = this.hlpservicecontinuityplanForm.get('planid').value;
        if(planid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpservicecontinuityplanservice.deletehlpservicecontinuityplan(planid).then(res =>
                {
                this.resetForm();
                }
            ).catch((err) => {console.log(err);});
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.hlpservicecontinuityplanForm.patchValue({
        planid: null
    });
    if(this.hlpservicecontinuityplanservice.formData.planid!=null)this.hlpservicecontinuityplanservice.formData.planid=null;
for (let i=0;i<this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.length;i++) {
this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails[i].plandetailid=null;
}
    }
    PopulateFromMainScreen(mainscreendata:any,bdisable:any)
    {
    if(mainscreendata!=null)
    {
      for (let key in mainscreendata) {
if(key!='visiblelist' && key!='hidelist' && key!='event'){
        
        let jsonstring="";
        let json=null;
let ctrltype=typeof (mainscreendata[key]);
if(false)
json="";
        else if(ctrltype=="string")
{
this.hlpservicecontinuityplanForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hlpservicecontinuityplanForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hlpservicecontinuityplanForm.controls[key]!=undefined)
{
this.hlpservicecontinuityplanForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(false);
}
else if(this.maindata!=null  && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

edithlpservicecontinuityplans() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hlpservicecontinuityplanservice.gethlpservicecontinuityplansByEID(pkcol).then(res => {

this.hlpservicecontinuityplanservice.formData=res.hlpservicecontinuityplan;
let formproperty=res.hlpservicecontinuityplan.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hlpservicecontinuityplan.pkcol;
this.formid=res.hlpservicecontinuityplan.planid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.hlpservicecontinuityplanservice.formData=res.hlpservicecontinuityplan;
this.formid=res.hlpservicecontinuityplan.planid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hlpservicecontinuityplanForm.patchValue({
planid: res.hlpservicecontinuityplan.planid,
introduction: res.hlpservicecontinuityplan.introduction,
purpose: res.hlpservicecontinuityplan.purpose,
scope: res.hlpservicecontinuityplan.scope,
status: res.hlpservicecontinuityplan.status,
statusdesc: res.hlpservicecontinuityplan.statusdesc,
});
this.hlpservicecontinuityplandetailsvisiblelist=res.hlpservicecontinuityplandetailsvisiblelist;
//Child Tables if any
this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails = res.hlpservicecontinuityplandetails;
this.SethlpservicecontinuityplandetailsTableConfig();
this.hlpservicecontinuityplandetailsLoadTable();
  setTimeout(() => {
  this.SethlpservicecontinuityplandetailsTableddConfig();
  });
}

validate()
{
let ret=true;
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.hlpservicecontinuityplanForm.controls) {
    if (this.hlpservicecontinuityplanForm.controls[key] != null) {
if(false)
{
if(this.hlpservicecontinuityplanservice.formData!=null && this.hlpservicecontinuityplanservice.formData[key]!=null  && this.hlpservicecontinuityplanservice.formData[key]!='[]' && this.hlpservicecontinuityplanservice.formData[key]!=undefined && this.hlpservicecontinuityplanservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hlpservicecontinuityplanservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hlpservicecontinuityplanservice.formData!=null && this.hlpservicecontinuityplanservice.formData[key]!=null   && this.hlpservicecontinuityplanservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hlpservicecontinuityplanservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hlpservicecontinuityplanservice.formData!=null && this.hlpservicecontinuityplanservice.formData[key]!=null   && this.hlpservicecontinuityplanservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hlpservicecontinuityplanservice.formData[key]+"'><div class='progress__number'>"+this.hlpservicecontinuityplanservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpservicecontinuityplanForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hlpservicecontinuityplanForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hlpservicecontinuityplanForm.value;
console.log(obj);
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
}

//This has to come from bomenuactions & procedures
afteraction(mode:any)
{
    let formname="";
    let query="";
    if(mode=="new")
        this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if(mode=="refresh")
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
}

private hlpservicecontinuityplantoggleOption(){
this.hlpservicecontinuityplanshowOption = this.hlpservicecontinuityplanshowOption === true ? false : true;
}

private hlpservicecontinuityplandetailtoggleOption(){
this.hlpservicecontinuityplandetailshowOption = this.hlpservicecontinuityplandetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hlpservicecontinuityplanForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hlpservicecontinuityplanForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hlpservicecontinuityplanForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hlpservicecontinuityplanservice.formData=this.hlpservicecontinuityplanForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hlpservicecontinuityplanForm.controls[key] != null)
    {
        this.hlpservicecontinuityplanservice.formData[key] = this.hlpservicecontinuityplanForm.controls[key].value;
    }
}
}
}
this.hlpservicecontinuityplanservice.formData.DeletedhlpservicecontinuityplandetailIDs = this.DeletedhlpservicecontinuityplandetailIDs;
console.log(this.hlpservicecontinuityplanservice.formData);
this.hlpservicecontinuityplanservice.formData=this.hlpservicecontinuityplanForm.value;
this.hlpservicecontinuityplanservice.saveOrUpdatehlpservicecontinuityplans().subscribe(
async res => {
if (this.hlpservicecontinuityplandetailssource.data)
{
    for (let i = 0; i < this.hlpservicecontinuityplandetailssource.data.length; i++)
    {
        if (this.hlpservicecontinuityplandetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpservicecontinuityplandetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpservicecontinuityplan);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hlpservicecontinuityplanservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpservicecontinuityplan);
}
else
{
this.FillData(res);
}
}
this.hlpservicecontinuityplanForm.markAsUntouched();
this.hlpservicecontinuityplanForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithlpservicecontinuityplandetail(event:any,plandetailid:any, planid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hlpservicecontinuityplandetailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,plandetailid, planid,visiblelist:this.hlpservicecontinuityplandetailsvisiblelist,  hidelist:this.hlpservicecontinuityplandetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hlpservicecontinuityplandetailssource.add(res);
this.hlpservicecontinuityplandetailssource.refresh();
}
else
{
this.hlpservicecontinuityplandetailssource.update(event.data, res);
}
}
});
}

onDeletehlpservicecontinuityplandetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpservicecontinuityplandetailIDs += childID + ",";
this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hlpservicecontinuityplandetails
hlpservicecontinuityplandetailssettings:any;
hlpservicecontinuityplandetailssource: any;

showhlpservicecontinuityplandetailsCheckbox()
{
debugger;
if(this.tblhlpservicecontinuityplandetailssource.settings['selectMode']== 'multi')this.tblhlpservicecontinuityplandetailssource.settings['selectMode']= 'single';
else
this.tblhlpservicecontinuityplandetailssource.settings['selectMode']= 'multi';
this.tblhlpservicecontinuityplandetailssource.initGrid();
}
deletehlpservicecontinuityplandetailsAll()
{
this.tblhlpservicecontinuityplandetailssource.settings['selectMode'] = 'single';
}
showhlpservicecontinuityplandetailsFilter()
{
  setTimeout(() => {
  this.SethlpservicecontinuityplandetailsTableddConfig();
  });
      if(this.tblhlpservicecontinuityplandetailssource.settings!=null)this.tblhlpservicecontinuityplandetailssource.settings['hideSubHeader'] =!this.tblhlpservicecontinuityplandetailssource.settings['hideSubHeader'];
this.tblhlpservicecontinuityplandetailssource.initGrid();
}
showhlpservicecontinuityplandetailsInActive()
{
}
enablehlpservicecontinuityplandetailsInActive()
{
}
async SethlpservicecontinuityplandetailsTableddConfig()
{
if(!this.bfilterPopulatehlpservicecontinuityplandetails){
}
this.bfilterPopulatehlpservicecontinuityplandetails=true;
}
async hlpservicecontinuityplandetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethlpservicecontinuityplandetailsTableConfig()
{
this.hlpservicecontinuityplandetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
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
category: {
title: 'Category',
type: '',
filter:true,
},
serviceid: {
title: 'Service',
type: 'number',
filter:true,
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
recoverydetails: {
title: 'Recovery Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
estimatedrecoverytime: {
title: 'Estimated Recovery Time',
type: '',
filter:true,
},
},
};
}
hlpservicecontinuityplandetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpservicecontinuityplandetailsID)>=0)
{
this.hlpservicecontinuityplandetailssource=new LocalDataSource();
this.hlpservicecontinuityplandetailssource.load(this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails as  any as LocalDataSource);
this.hlpservicecontinuityplandetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hlpservicecontinuityplandetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.length == 0)
{
    this.tblhlpservicecontinuityplandetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hlpservicecontinuityplandetail();
    this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.push(obj);
    this.hlpservicecontinuityplandetailssource.refresh();
    if ((this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.length / this.hlpservicecontinuityplandetailssource.getPaging().perPage).toFixed(0) + 1 != this.hlpservicecontinuityplandetailssource.getPaging().page)
    {
        this.hlpservicecontinuityplandetailssource.setPage((this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.length / this.hlpservicecontinuityplandetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpservicecontinuityplandetailssource.grid.edit(this.tblhlpservicecontinuityplandetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpservicecontinuityplandetailssource.data.indexOf(event.data);
this.onDeletehlpservicecontinuityplandetail(event,event.data.plandetailid,((this.hlpservicecontinuityplandetailssource.getPaging().page-1) *this.hlpservicecontinuityplandetailssource.getPaging().perPage)+index);
this.hlpservicecontinuityplandetailssource.refresh();
break;
}
}

*/
hlpservicecontinuityplandetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithlpservicecontinuityplandetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithlpservicecontinuityplandetail(event,event.data.plandetailid,this.formid);
break;
case 'delete':
this.onDeletehlpservicecontinuityplandetail(event,event.data.plandetailid,((this.hlpservicecontinuityplandetailssource.getPaging().page-1) *this.hlpservicecontinuityplandetailssource.getPaging().perPage)+event.index);
this.hlpservicecontinuityplandetailssource.refresh();
break;
}
}
hlpservicecontinuityplandetailsonDelete(obj) {
let plandetailid=obj.data.plandetailid;
if (confirm('Are you sure to delete this record ?')) {
this.hlpservicecontinuityplanservice.deletehlpservicecontinuityplan(plandetailid).then(res=>
this.hlpservicecontinuityplandetailsLoadTable()
);
}
}
hlpservicecontinuityplandetailsPaging(val)
{
debugger;
this.hlpservicecontinuityplandetailssource.setPaging(1, val, true);
}

handlehlpservicecontinuityplandetailsGridSelected(event:any) {
this.hlpservicecontinuityplandetailsselectedindex=this.hlpservicecontinuityplanservice.hlpservicecontinuityplandetails.findIndex(i => i.plandetailid === event.data.plandetailid);
}
IshlpservicecontinuityplandetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hlpservicecontinuityplandetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpservicecontinuityplandetails

}



