import { camspmsuppliertaskService } from './../../../service/camspmsuppliertask.service';
import { camspmsuppliertask } from './../../../model/camspmsuppliertask.model';
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
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
//popups
import { erpsuppliermaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
//popups
//detail table services
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
selector: 'app-camspmsuppliertask',
templateUrl: './camspmsuppliertask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camspmsuppliertaskComponent implements OnInit {
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
bfilterPopulatecamspmsuppliertasks:boolean=false;
datacamspmsuppliertaskspmid3:any=[];
datacamspmsuppliertaskssupplierid3:any=[];
datacamspmsuppliertaskstasktype3:any=[];
 camspmsuppliertaskForm: FormGroup;
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
tasktypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camspmsuppliertaskshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camspmsuppliertaskservice: camspmsuppliertaskService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camspmmasterservice:camspmmasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
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
this.camspmsuppliertaskForm  = this.fb.group({
pk:[null],
pmsupplierid: [null],
pmid: [null],
pmiddesc: [null],
supplierid: [null, Validators.required],
supplieriddesc: [null],
taskdescription: [null, Validators.required],
tasktype: [null],
tasktypedesc: [null],
notes: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camspmsuppliertaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camspmsuppliertaskForm.dirty && this.camspmsuppliertaskForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.pmsupplierid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.pmsupplierid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.pmsupplierid && pkDetail) {
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
let camspmsuppliertaskid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=camspmsuppliertaskid;
//this.sharedService.alert(camspmsuppliertaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camspmsuppliertaskservice.formData && this.camspmsuppliertaskservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camspmsuppliertaskForm.patchValue({
    pmid: this.camspmsuppliertaskservice.formData.pmid,
    pmiddesc: this.camspmsuppliertaskservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camspmsuppliertaskForm.get('pmid').value);
let objpmid;
if (arrpmid.length > 0) objpmid = arrpmid[0];
if (objpmid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmid_camspmmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmid_camspmmastersformatter = (result: any) => result.reference;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.camspmsuppliertaskservice.formData && this.camspmsuppliertaskservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.camspmsuppliertaskForm.patchValue({
    supplierid: this.camspmsuppliertaskservice.formData.supplierid,
    supplieriddesc: this.camspmsuppliertaskservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.camspmsuppliertaskForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.configservice.getList("camstasktype").then(res => this.tasktypeList = res as boconfigvalue[]);

//autocomplete
    this.camspmsuppliertaskservice.getcamspmsuppliertasksList().then(res => {
      this.pkList = res as camspmsuppliertask[];
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
this.camspmsuppliertaskForm.markAsUntouched();
this.camspmsuppliertaskForm.markAsPristine();
}
onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camspmsuppliertaskForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.camspmsuppliertaskForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}




resetForm() {
if (this.camspmsuppliertaskForm != null)
this.camspmsuppliertaskForm.reset();
this.camspmsuppliertaskForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let pmsupplierid = this.camspmsuppliertaskForm.get('pmsupplierid').value;
        if(pmsupplierid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camspmsuppliertaskservice.deletecamspmsuppliertask(pmsupplierid).then(res =>
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
    this.camspmsuppliertaskForm.patchValue({
        pmsupplierid: null
    });
    if(this.camspmsuppliertaskservice.formData.pmsupplierid!=null)this.camspmsuppliertaskservice.formData.pmsupplierid=null;
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
this.camspmsuppliertaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camspmsuppliertaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camspmsuppliertaskForm.controls[key]!=undefined)
{
this.camspmsuppliertaskForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  )
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
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
pmsupplieridonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
taskdescriptiononChange(evt:any){
let e=evt.value;
}
tasktypeonChange(evt:any){
let e=this.f.tasktype.value as any;
this.camspmsuppliertaskForm.patchValue({tasktypedesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamspmsuppliertasks() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camspmsuppliertaskservice.getcamspmsuppliertasksByEID(pkcol).then(res => {

this.camspmsuppliertaskservice.formData=res.camspmsuppliertask;
let formproperty=res.camspmsuppliertask.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camspmsuppliertask.pkcol;
this.formid=res.camspmsuppliertask.pmsupplierid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camspmsuppliertask.pmsupplierid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camspmsuppliertaskForm.patchValue({
pmsupplierid: res.camspmsuppliertask.pmsupplierid,
pmid: res.camspmsuppliertask.pmid,
pmiddesc: res.camspmsuppliertask.pmiddesc,
supplierid: res.camspmsuppliertask.supplierid,
supplieriddesc: res.camspmsuppliertask.supplieriddesc,
taskdescription: res.camspmsuppliertask.taskdescription,
tasktype: res.camspmsuppliertask.tasktype,
tasktypedesc: res.camspmsuppliertask.tasktypedesc,
notes: res.camspmsuppliertask.notes,
remarks: res.camspmsuppliertask.remarks,
status: res.camspmsuppliertask.status,
statusdesc: res.camspmsuppliertask.statusdesc,
});
//Child Tables if any
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
  for (let key in this.camspmsuppliertaskForm.controls) {
    if (this.camspmsuppliertaskForm.controls[key] != null) {
if(false)
{
if(this.camspmsuppliertaskservice.formData!=null && this.camspmsuppliertaskservice.formData[key]!=null  && this.camspmsuppliertaskservice.formData[key]!='[]' && this.camspmsuppliertaskservice.formData[key]!=undefined && this.camspmsuppliertaskservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camspmsuppliertaskservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camspmsuppliertaskservice.formData!=null && this.camspmsuppliertaskservice.formData[key]!=null   && this.camspmsuppliertaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camspmsuppliertaskservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camspmsuppliertaskservice.formData!=null && this.camspmsuppliertaskservice.formData[key]!=null   && this.camspmsuppliertaskservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camspmsuppliertaskservice.formData[key]+"'><div class='progress__number'>"+this.camspmsuppliertaskservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camspmsuppliertaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camspmsuppliertaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camspmsuppliertaskForm.value;
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

private camspmsuppliertasktoggleOption(){
this.camspmsuppliertaskshowOption = this.camspmsuppliertaskshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camspmsuppliertaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camspmsuppliertaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camspmsuppliertaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camspmsuppliertaskservice.formData=this.camspmsuppliertaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camspmsuppliertaskForm.controls[key] != null)
    {
        this.camspmsuppliertaskservice.formData[key] = this.camspmsuppliertaskForm.controls[key].value;
    }
}
}
}
console.log(this.camspmsuppliertaskservice.formData);
this.camspmsuppliertaskservice.formData=this.camspmsuppliertaskForm.value;
this.camspmsuppliertaskservice.saveOrUpdatecamspmsuppliertasks().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmsuppliertask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camspmsuppliertaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camspmsuppliertask);
}
else
{
this.FillData(res);
}
}
this.camspmsuppliertaskForm.markAsUntouched();
this.camspmsuppliertaskForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camspmsuppliertaskForm.get('pmid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.camspmsuppliertaskForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



