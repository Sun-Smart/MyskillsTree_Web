import { erpsupplieritemfeatureService } from './../../../service/erpsupplieritemfeature.service';
import { erpsupplieritemfeature } from './../../../model/erpsupplieritemfeature.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erpsupplieritem} from './../../../model/erpsupplieritem.model';
import { erpsupplieritemComponent } from './../../../pages/forms/erpsupplieritem/erpsupplieritem.component';
import { erpsupplieritemService } from './../../../service/erpsupplieritem.service';
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
selector: 'app-erpsupplieritemfeature',
templateUrl: './erpsupplieritemfeature.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplieritemfeatureComponent implements OnInit {
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
bfilterPopulateerpsupplieritemfeatures:boolean=false;
dataerpsupplieritemfeaturessupplierid3:any=[];
dataerpsupplieritemfeaturessupplieritemid3:any=[];
 erpsupplieritemfeatureForm: FormGroup;
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
supplieritemidList: erpsupplieritem[];
supplieritemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplieritemid_erpsupplieritemsForm: FormGroup;//autocomplete
supplieritemid_erpsupplieritemsoptions:any;//autocomplete
supplieritemid_erpsupplieritemsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplieritemfeatureshowOption:boolean;
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
private erpsupplieritemfeatureservice: erpsupplieritemfeatureService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpsupplieritemservice:erpsupplieritemService,
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
this.erpsupplieritemfeatureForm  = this.fb.group({
pk:[null],
supplierid: [null],
supplieriddesc: [null],
supplieritemid: [null],
supplieritemiddesc: [null],
featureid: [null],
featurename: [null],
value: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplieritemfeatureForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplieritemfeatureForm.dirty && this.erpsupplieritemfeatureForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.featureid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.featureid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.featureid && pkDetail) {
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
let erpsupplieritemfeatureid = null;

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
this.formid=erpsupplieritemfeatureid;
//this.sharedService.alert(erpsupplieritemfeatureid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplieritemfeatureservice.formData && this.erpsupplieritemfeatureservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplieritemfeatureForm.patchValue({
    supplierid: this.erpsupplieritemfeatureservice.formData.supplierid,
    supplieriddesc: this.erpsupplieritemfeatureservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplieritemfeatureForm.get('supplierid').value);
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
this.erpsupplieritemservice.geterpsupplieritemsList().then(res => 
{
this.supplieritemidList = res as erpsupplieritem[];
if(this.erpsupplieritemfeatureservice.formData && this.erpsupplieritemfeatureservice.formData.supplieritemid){
this.supplieritemidoptionsEvent.emit(this.supplieritemidList);
this.erpsupplieritemfeatureForm.patchValue({
    supplieritemid: this.erpsupplieritemfeatureservice.formData.supplieritemid,
    supplieritemiddesc: this.erpsupplieritemfeatureservice.formData.supplieritemiddesc,
});
}
{
let arrsupplieritemid = this.supplieritemidList.filter(v => v.supplierid == this.erpsupplieritemfeatureForm.get('supplieritemid').value);
let objsupplieritemid;
if (arrsupplieritemid.length > 0) objsupplieritemid = arrsupplieritemid[0];
if (objsupplieritemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplieritemid_erpsupplieritemsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieritemidList.filter(v => v.supplieritemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplieritemid_erpsupplieritemsformatter = (result: any) => result.supplieritemcode;

//autocomplete
    this.erpsupplieritemfeatureservice.geterpsupplieritemfeaturesList().then(res => {
      this.pkList = res as erpsupplieritemfeature[];
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
this.erpsupplieritemfeatureForm.markAsUntouched();
this.erpsupplieritemfeatureForm.markAsPristine();
}
onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplieritemfeatureForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedsupplieritemid(supplieritemidDetail: any) {
if (supplieritemidDetail.supplierid && supplieritemidDetail) {
this.erpsupplieritemfeatureForm.patchValue({
supplieritemid: supplieritemidDetail.supplierid,
supplieritemiddesc: supplieritemidDetail.supplieritemcode,

});

}
}




resetForm() {
if (this.erpsupplieritemfeatureForm != null)
this.erpsupplieritemfeatureForm.reset();
this.erpsupplieritemfeatureForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let featureid = this.erpsupplieritemfeatureForm.get('featureid').value;
        if(featureid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplieritemfeatureservice.deleteerpsupplieritemfeature(featureid).then(res =>
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
    this.erpsupplieritemfeatureForm.patchValue({
        featureid: null
    });
    if(this.erpsupplieritemfeatureservice.formData.featureid!=null)this.erpsupplieritemfeatureservice.formData.featureid=null;
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
this.erpsupplieritemfeatureForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplieritemfeatureForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplieritemfeatureForm.controls[key]!=undefined)
{
this.erpsupplieritemfeatureForm.controls[key].disable({onlySelf: true});
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
supplieridonChange(evt:any){
let e=evt.value;
}
supplieritemidonChange(evt:any){
let e=evt.value;
}
featureidonChange(evt:any){
let e=evt.value;
}
featurenameonChange(evt:any){
let e=evt.value;
}
valueonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplieritemfeatures() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplieritemfeatureservice.geterpsupplieritemfeaturesByEID(pkcol).then(res => {

this.erpsupplieritemfeatureservice.formData=res.erpsupplieritemfeature;
let formproperty=res.erpsupplieritemfeature.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplieritemfeature.pkcol;
this.formid=res.erpsupplieritemfeature.featureid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplieritemfeature.featureid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplieritemfeatureForm.patchValue({
supplierid: res.erpsupplieritemfeature.supplierid,
supplieriddesc: res.erpsupplieritemfeature.supplieriddesc,
supplieritemid: res.erpsupplieritemfeature.supplieritemid,
supplieritemiddesc: res.erpsupplieritemfeature.supplieritemiddesc,
featureid: res.erpsupplieritemfeature.featureid,
featurename: res.erpsupplieritemfeature.featurename,
value: res.erpsupplieritemfeature.value,
status: res.erpsupplieritemfeature.status,
statusdesc: res.erpsupplieritemfeature.statusdesc,
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
  for (let key in this.erpsupplieritemfeatureForm.controls) {
    if (this.erpsupplieritemfeatureForm.controls[key] != null) {
if(false)
{
if(this.erpsupplieritemfeatureservice.formData!=null && this.erpsupplieritemfeatureservice.formData[key]!=null  && this.erpsupplieritemfeatureservice.formData[key]!='[]' && this.erpsupplieritemfeatureservice.formData[key]!=undefined && this.erpsupplieritemfeatureservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplieritemfeatureservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplieritemfeatureservice.formData!=null && this.erpsupplieritemfeatureservice.formData[key]!=null   && this.erpsupplieritemfeatureservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplieritemfeatureservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplieritemfeatureservice.formData!=null && this.erpsupplieritemfeatureservice.formData[key]!=null   && this.erpsupplieritemfeatureservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplieritemfeatureservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplieritemfeatureservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplieritemfeatureForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplieritemfeatureForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplieritemfeatureForm.value;
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

private erpsupplieritemfeaturetoggleOption(){
this.erpsupplieritemfeatureshowOption = this.erpsupplieritemfeatureshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplieritemfeatureForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplieritemfeatureForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplieritemfeatureForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplieritemfeatureservice.formData=this.erpsupplieritemfeatureForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplieritemfeatureForm.controls[key] != null)
    {
        this.erpsupplieritemfeatureservice.formData[key] = this.erpsupplieritemfeatureForm.controls[key].value;
    }
}
}
}
console.log(this.erpsupplieritemfeatureservice.formData);
this.erpsupplieritemfeatureservice.formData=this.erpsupplieritemfeatureForm.value;
this.erpsupplieritemfeatureservice.saveOrUpdateerpsupplieritemfeatures().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplieritemfeature);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplieritemfeatureservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplieritemfeature);
}
else
{
this.FillData(res);
}
}
this.erpsupplieritemfeatureForm.markAsUntouched();
this.erpsupplieritemfeatureForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplieritemfeatureForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplieritemid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsupplieritemComponent, 
{
data: {supplierid:this.erpsupplieritemfeatureForm.get('supplieritemid').value, ScreenType:2 }
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



