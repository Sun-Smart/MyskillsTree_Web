import { bokbtopicService } from './../../../service/bokbtopic.service';
import { bokbtopic } from './../../../model/bokbtopic.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bokbmaster} from './../../../model/bokbmaster.model';
import { bokbmasterService } from './../../../service/bokbmaster.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';

@Component({
selector: 'app-bokbtopic',
templateUrl: './bokbtopic.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bokbtopicComponent implements OnInit {
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
bfilterPopulatebokbtopics:boolean=false;
databokbtopicskbid3:any=[];
databokbtopicscontenttype3:any=[];
 bokbtopicForm: FormGroup;
kbidList: bokbmaster[];
kbidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
kbid_bokbmastersForm: FormGroup;//autocomplete
kbid_bokbmastersoptions:any;//autocomplete
kbid_bokbmastersformatter:any;//autocomplete
contenttypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('contenturl',{static:false}) contenturl: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bokbtopicservice: bokbtopicService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bokbmasterservice:bokbmasterService,
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
this.bokbtopicForm  = this.fb.group({pk:[null],kbtopicid: [null],
kbid: [null],
kbiddesc: [null],
description: [null],
sequence: [null],
contenttype: [null],
contenttypedesc: [null],
contenttext: [null],
contenturl: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bokbtopicForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bokbtopicForm.dirty && this.bokbtopicForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.kbtopicid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.kbtopicid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.kbtopicid && pkDetail) {
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

debugger;
let bokbtopicid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=bokbtopicid;
//this.sharedService.alert(bokbtopicid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bokbmasterservice.getbokbmastersList().then(res => 
{
this.kbidList = res as bokbmaster[];
if(this.bokbtopicservice.formData && this.bokbtopicservice.formData.kbid){
this.kbidoptionsEvent.emit(this.kbidList);
this.bokbtopicForm.patchValue({
    kbid: this.bokbtopicservice.formData.kbid,
    kbiddesc: this.bokbtopicservice.formData.kbiddesc,
});
}
{
let arrkbid = this.kbidList.filter(v => v.kbid == this.bokbtopicForm.get('kbid').value);
let objkbid;
if (arrkbid.length > 0) objkbid = arrkbid[0];
if (objkbid)
{
}
}
}
).catch((err) => {console.log(err);});
this.kbid_bokbmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.kbidList.filter(v => v.kbsubject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.kbid_bokbmastersformatter = (result: any) => result.kbsubject;
this.configservice.getList("contenttype").then(res => this.contenttypeList = res as boconfigvalue[]);

//autocomplete
    this.bokbtopicservice.getbokbtopicsList().then(res => {
      this.pkList = res as bokbtopic[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.bokbtopicForm.markAsUntouched();
this.bokbtopicForm.markAsPristine();
}
onSelectedkbid(kbidDetail: any) {
if (kbidDetail.kbid && kbidDetail) {
this.bokbtopicForm.patchValue({
kbid: kbidDetail.kbid,
kbiddesc: kbidDetail.kbsubject,

});

}
}




  getcontenturl() {
    debugger;
    if (this.contenturl.getattachmentlist().length > 0) {
      let file = this.contenturl.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.bokbtopicForm != null)
this.bokbtopicForm.reset();
this.bokbtopicForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let kbtopicid = this.bokbtopicForm.get('kbtopicid').value;
        if(kbtopicid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bokbtopicservice.deletebokbtopic(kbtopicid).then(res =>
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
    this.bokbtopicForm.patchValue({
        kbtopicid: null
    });
    if(this.bokbtopicservice.formData.kbtopicid!=null)this.bokbtopicservice.formData.kbtopicid=null;
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
this.bokbtopicForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bokbtopicForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bokbtopicForm.controls[key]!=undefined)this.bokbtopicForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
kbtopicidonChange(evt:any){
let e=evt.value;
}
kbidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
contenttypeonChange(evt:any){
let e=this.f.contenttype.value as any;
this.bokbtopicForm.patchValue({contenttypedesc:evt.options[evt.options.selectedIndex].text});
}
contenttextonChange(evt:any){
let e=evt.value;
}
contenturlonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bokbtopicservice.getbokbtopicsByEID(pkcol).then(res => {

this.bokbtopicservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bokbtopic.kbtopicid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bokbtopic.kbtopicid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bokbtopicForm.patchValue({
kbtopicid: res.bokbtopic.kbtopicid,
kbid: res.bokbtopic.kbid,
kbiddesc: res.bokbtopic.kbiddesc,
description: res.bokbtopic.description,
sequence: res.bokbtopic.sequence,
contenttype: res.bokbtopic.contenttype,
contenttypedesc: res.bokbtopic.contenttypedesc,
contenttext: res.bokbtopic.contenttext,
contenturl: res.bokbtopic.contenturl,
status: res.bokbtopic.status,
statusdesc: res.bokbtopic.statusdesc,
});
if(this.bokbtopicForm.get('contenturl').value!=null && this.bokbtopicForm.get('contenturl').value!="" && this.contenturl!=null && this.contenturl!=undefined)this.contenturl.setattachmentlist(JSON.parse(this.bokbtopicForm.get('contenturl').value));
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
  for (let key in this.bokbtopicForm.controls) {
    if (this.bokbtopicForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bokbtopicForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bokbtopicForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bokbtopicForm.value;
console.log(obj);
await this.sharedService.upload(this.contenturl.getAllFiles());
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bokbtopicForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bokbtopicForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bokbtopicForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bokbtopicservice.formData=this.bokbtopicForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bokbtopicForm.controls[key] != null)
    {
        this.bokbtopicservice.formData[key] = this.bokbtopicForm.controls[key].value;
    }
}
}
}
this.bokbtopicservice.formData.contenturl=this.bokbtopicForm.get('contenturl').value;
console.log(this.bokbtopicservice.formData);
this.bokbtopicservice.formData=this.bokbtopicForm.value;
this.bokbtopicservice.saveOrUpdatebokbtopics().subscribe(
async res => {
await this.sharedService.upload(this.contenturl.getAllFiles());
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bokbtopic);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bokbtopicservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bokbtopic);
}
else
{
this.FillData(res);
}
}
this.bokbtopicForm.markAsUntouched();
this.bokbtopicForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditkbid( kbid) {
/*let ScreenType='2';
this.dialog.open(bokbmasterComponent, 
{
data: {kbid:this.bokbtopicForm.get('kbid').value, ScreenType:2 }
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



