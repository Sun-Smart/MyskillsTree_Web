import { erpqcdetailService } from './../../../service/erpqcdetail.service';
import { erpqcdetail } from './../../../model/erpqcdetail.model';
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
import { erpgoodsreceiptmaster} from './../../../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from './../../../pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
//popups
import { erpqcmaster} from './../../../model/erpqcmaster.model';
import { erpqcmasterComponent } from './../../../pages/forms/erpqcmaster/erpqcmaster.component';
import { erpqcmasterService } from './../../../service/erpqcmaster.service';
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
selector: 'app-erpqcdetail',
templateUrl: './erpqcdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpqcdetailComponent implements OnInit {
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
bfilterPopulateerpqcdetails:boolean=false;
dataerpqcdetailsgrnid3:any=[];
dataerpqcdetailsqcid3:any=[];
 erpqcdetailForm: FormGroup;
grnidList: erpgoodsreceiptmaster[];
grnidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnid_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnid_erpgoodsreceiptmastersoptions:any;//autocomplete
grnid_erpgoodsreceiptmastersformatter:any;//autocomplete
qcidList: erpqcmaster[];
qcidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
qcid_erpqcmastersForm: FormGroup;//autocomplete
qcid_erpqcmastersoptions:any;//autocomplete
qcid_erpqcmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpqcdetailshowOption:boolean;
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
private erpqcdetailservice: erpqcdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpgoodsreceiptmasterservice:erpgoodsreceiptmasterService,
private erpqcmasterservice:erpqcmasterService,
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
this.erpqcdetailForm  = this.fb.group({
pk:[null],
branchid: [null],
grnid: [null],
grniddesc: [null],
grnnumber: [null],
grndetailsid: [null],
qcid: [null],
qciddesc: [null],
qcdetailid: [null],
itemid: [null],
uom: [null],
currentdelivery: [null],
qccleared: [null],
qcfailed: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpqcdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpqcdetailForm.dirty && this.erpqcdetailForm.touched ) {
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
????if(this.pkList.length>0)??this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
??if(this.pkList.length>0)??this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
????debugger;
????let??pos??=??this.pkList.map(function(e:any)??{??return e.qcdetailid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.qcdetailid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.qcdetailid && pkDetail) {
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
let erpqcdetailid = null;

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
this.formid=erpqcdetailid;
//this.sharedService.alert(erpqcdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => 
{
this.grnidList = res as erpgoodsreceiptmaster[];
if(this.erpqcdetailservice.formData && this.erpqcdetailservice.formData.grnid){
this.grnidoptionsEvent.emit(this.grnidList);
this.erpqcdetailForm.patchValue({
    grnid: this.erpqcdetailservice.formData.grnid,
    grniddesc: this.erpqcdetailservice.formData.grniddesc,
});
}
{
let arrgrnid = this.grnidList.filter(v => v.grnid == this.erpqcdetailForm.get('grnid').value);
let objgrnid;
if (arrgrnid.length > 0) objgrnid = arrgrnid[0];
if (objgrnid)
{
}
}
}
).catch((err) => {console.log(err);});
this.grnid_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnidList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnid_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;
this.erpqcmasterservice.geterpqcmastersList().then(res => 
{
this.qcidList = res as erpqcmaster[];
if(this.erpqcdetailservice.formData && this.erpqcdetailservice.formData.qcid){
this.qcidoptionsEvent.emit(this.qcidList);
this.erpqcdetailForm.patchValue({
    qcid: this.erpqcdetailservice.formData.qcid,
    qciddesc: this.erpqcdetailservice.formData.qciddesc,
});
}
{
let arrqcid = this.qcidList.filter(v => v.qcid == this.erpqcdetailForm.get('qcid').value);
let objqcid;
if (arrqcid.length > 0) objqcid = arrqcid[0];
if (objqcid)
{
}
}
}
).catch((err) => {console.log(err);});
this.qcid_erpqcmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.qcidList.filter(v => v.qcref.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.qcid_erpqcmastersformatter = (result: any) => result.qcref;

//autocomplete
    this.erpqcdetailservice.geterpqcdetailsList().then(res => {
      this.pkList = res as erpqcdetail[];
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
this.erpqcdetailForm.markAsUntouched();
this.erpqcdetailForm.markAsPristine();
}
onSelectedgrnid(grnidDetail: any) {
if (grnidDetail.grnid && grnidDetail) {
this.erpqcdetailForm.patchValue({
grnid: grnidDetail.grnid,
grniddesc: grnidDetail.grnnumber,

});

}
}

onSelectedqcid(qcidDetail: any) {
if (qcidDetail.qcid && qcidDetail) {
this.erpqcdetailForm.patchValue({
qcid: qcidDetail.qcid,
qciddesc: qcidDetail.qcref,

});

}
}




resetForm() {
if (this.erpqcdetailForm != null)
this.erpqcdetailForm.reset();
this.erpqcdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let qcdetailid = this.erpqcdetailForm.get('qcdetailid').value;
        if(qcdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpqcdetailservice.deleteerpqcdetail(qcdetailid).then(res =>
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
    this.erpqcdetailForm.patchValue({
        qcdetailid: null
    });
    if(this.erpqcdetailservice.formData.qcdetailid!=null)this.erpqcdetailservice.formData.qcdetailid=null;
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
this.erpqcdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpqcdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpqcdetailForm.controls[key]!=undefined)
{
this.erpqcdetailForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
grnidonChange(evt:any){
let e=evt.value;
}
grnnumberonChange(evt:any){
let e=evt.value;
}
grndetailsidonChange(evt:any){
let e=evt.value;
}
qcidonChange(evt:any){
let e=evt.value;
}
qcdetailidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=evt.value;
}
currentdeliveryonChange(evt:any){
let e=evt.value;
}
qcclearedonChange(evt:any){
let e=evt.value;
}
qcfailedonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpqcdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpqcdetailservice.geterpqcdetailsByEID(pkcol).then(res => {

this.erpqcdetailservice.formData=res.erpqcdetail;
let formproperty=res.erpqcdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpqcdetail.pkcol;
this.formid=res.erpqcdetail.qcdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpqcdetail.qcdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpqcdetailForm.patchValue({
branchid: res.erpqcdetail.branchid,
grnid: res.erpqcdetail.grnid,
grniddesc: res.erpqcdetail.grniddesc,
grnnumber: res.erpqcdetail.grnnumber,
grndetailsid: res.erpqcdetail.grndetailsid,
qcid: res.erpqcdetail.qcid,
qciddesc: res.erpqcdetail.qciddesc,
qcdetailid: res.erpqcdetail.qcdetailid,
itemid: res.erpqcdetail.itemid,
uom: res.erpqcdetail.uom,
currentdelivery: res.erpqcdetail.currentdelivery,
qccleared: res.erpqcdetail.qccleared,
qcfailed: res.erpqcdetail.qcfailed,
status: res.erpqcdetail.status,
statusdesc: res.erpqcdetail.statusdesc,
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
  for (let key in this.erpqcdetailForm.controls) {
    if (this.erpqcdetailForm.controls[key] != null) {
if(false)
{
if(this.erpqcdetailservice.formData!=null && this.erpqcdetailservice.formData[key]!=null  && this.erpqcdetailservice.formData[key]!='[]' && this.erpqcdetailservice.formData[key]!=undefined && this.erpqcdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpqcdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpqcdetailservice.formData!=null && this.erpqcdetailservice.formData[key]!=null   && this.erpqcdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpqcdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpqcdetailservice.formData!=null && this.erpqcdetailservice.formData[key]!=null   && this.erpqcdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpqcdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpqcdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpqcdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpqcdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpqcdetailForm.value;
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

private erpqcdetailtoggleOption(){
this.erpqcdetailshowOption = this.erpqcdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpqcdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpqcdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpqcdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpqcdetailservice.formData=this.erpqcdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpqcdetailForm.controls[key] != null)
    {
        this.erpqcdetailservice.formData[key] = this.erpqcdetailForm.controls[key].value;
    }
}
}
}
console.log(this.erpqcdetailservice.formData);
this.erpqcdetailservice.formData=this.erpqcdetailForm.value;
this.erpqcdetailservice.saveOrUpdateerpqcdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpqcdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpqcdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpqcdetail);
}
else
{
this.FillData(res);
}
}
this.erpqcdetailForm.markAsUntouched();
this.erpqcdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditgrnid( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.erpqcdetailForm.get('grnid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditqcid( qcid) {
/*let ScreenType='2';
this.dialog.open(erpqcmasterComponent, 
{
data: {qcid:this.erpqcdetailForm.get('qcid').value, ScreenType:2 }
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



