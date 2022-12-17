import { prjconfigurationitemService } from './../../../service/prjconfigurationitem.service';
import { prjconfigurationitem } from './../../../model/prjconfigurationitem.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

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
selector: 'app-prjconfigurationitem',
templateUrl: './prjconfigurationitem.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjconfigurationitemComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulateprjconfigurationitems:boolean=false;
dataprjconfigurationitemstype3:any=[];
dataprjconfigurationitemscurrentstatus3:any=[];
 prjconfigurationitemForm: FormGroup;
typeList: boconfigvalue[]=[];//dropdown
currentstatusList: boconfigvalue[]=[];//dropdown
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjconfigurationitemservice: prjconfigurationitemService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.prjconfigurationitemForm  = this.fb.group({pk:[null],itemid: [null],
sourcefield: [null],
sourcereference: [null],
description: [null],
type: [null],
typedesc: [null],
manufacturerdetails: [null],
version: [null],
locationid: [null],
currentstatus: [null],
currentstatusdesc: [null],
linkeditems: [null],
documentationlink: [null],
licensedetails: [null],
owner: [null],
supplier: [null],
history: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjconfigurationitemForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjconfigurationitemForm.dirty && this.prjconfigurationitemForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.itemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.itemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.itemid && pkDetail) {
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
let prjconfigurationitemid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=prjconfigurationitemid;
//this.sharedService.alert(prjconfigurationitemid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("configurationtype").then((res:any) => this.typeList = res as boconfigvalue[]);
this.configservice.getList("currentstatus").then((res:any) => this.currentstatusList = res as boconfigvalue[]);

//autocomplete
    this.prjconfigurationitemservice.getprjconfigurationitemsList().then((res:any) => {
      this.pkList = res as prjconfigurationitem[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.prjconfigurationitemForm.markAsUntouched();
this.prjconfigurationitemForm.markAsPristine();
}



resetForm() {
if (this.prjconfigurationitemForm != null)
this.prjconfigurationitemForm.reset();
this.prjconfigurationitemForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.prjconfigurationitemForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let itemid = this.prjconfigurationitemForm.get('itemid')!.value;
        if(itemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjconfigurationitemservice.deleteprjconfigurationitem(itemid).then((res:any) =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.prjconfigurationitemForm.patchValue({
        itemid: null
    });
    if(this.prjconfigurationitemservice.formData.itemid!=null)this.prjconfigurationitemservice.formData.itemid=null;
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.prjconfigurationitemForm.controls[key]!=null)
{
this.prjconfigurationitemForm.patchValue(json);
         if(bdisable)this.prjconfigurationitemForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
typeonChange(evt:any){
let e=this.f.type!.value as any;
this.prjconfigurationitemForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
currentstatusonChange(evt:any){
let e=this.f.currentstatus!.value as any;
this.prjconfigurationitemForm.patchValue({currentstatusdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){this.prjconfigurationitemservice.getprjconfigurationitemsByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.prjconfigurationitem.itemid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.prjconfigurationitem.itemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjconfigurationitemForm.patchValue({
itemid: res.prjconfigurationitem.itemid,
sourcefield: res.prjconfigurationitem.sourcefield,
sourcereference: res.prjconfigurationitem.sourcereference,
description: res.prjconfigurationitem.description,
type: res.prjconfigurationitem.type,
typedesc: res.prjconfigurationitem.typedesc,
manufacturerdetails: res.prjconfigurationitem.manufacturerdetails,
version: res.prjconfigurationitem.version,
locationid: res.prjconfigurationitem.locationid,
currentstatus: res.prjconfigurationitem.currentstatus,
currentstatusdesc: res.prjconfigurationitem.currentstatusdesc,
linkeditems: res.prjconfigurationitem.linkeditems,
documentationlink: res.prjconfigurationitem.documentationlink,
licensedetails: res.prjconfigurationitem.licensedetails,
owner: res.prjconfigurationitem.owner,
supplier: res.prjconfigurationitem.supplier,
history: res.prjconfigurationitem.history,
status: res.prjconfigurationitem.status,
statusdesc: res.prjconfigurationitem.statusdesc,
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
  for (let key in this.prjconfigurationitemForm.controls) {
    if (this.prjconfigurationitemForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjconfigurationitemForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjconfigurationitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.prjconfigurationitemForm!.value;
console.log(obj);
this.dialogRef.close(obj);
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
Object.keys(this.prjconfigurationitemForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjconfigurationitemForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjconfigurationitemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjconfigurationitemservice.formData=this.prjconfigurationitemForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjconfigurationitemForm.controls[key] != null)
    {
        this.prjconfigurationitemservice.formData[key] = this.prjconfigurationitemForm.controls[key]!.value;
    }
}
}
}
console.log(this.prjconfigurationitemservice.formData);
this.prjconfigurationitemservice.saveOrUpdateprjconfigurationitems().subscribe(
async (res:any) => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result!.value.prjconfigurationitem);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjconfigurationitemservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result!.value.prjconfigurationitem);
}
else
{
this.FillData((res as any).result!.value);
}
}
this.prjconfigurationitemForm.markAsUntouched();
this.prjconfigurationitemForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



