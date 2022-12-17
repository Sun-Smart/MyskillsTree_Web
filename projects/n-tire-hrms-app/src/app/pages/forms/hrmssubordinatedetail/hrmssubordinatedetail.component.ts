import { hrmssubordinatedetailService } from './../../../service/hrmssubordinatedetail.service';
import { hrmssubordinatedetail } from './../../../model/hrmssubordinatedetail.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-hrmssubordinatedetail',
templateUrl: './hrmssubordinatedetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmssubordinatedetailComponent implements OnInit {
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
bfilterPopulatehrmssubordinatedetails:boolean=false;
datahrmssubordinatedetailsroleid3:any=[];
datahrmssubordinatedetailssubordinateto3:any=[];
 hrmssubordinatedetailForm: FormGroup;
roleidList: bouserrolemaster[];
subordinatetoList: bousermaster[];
subordinatetooptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
subordinateto_bousermastersForm: FormGroup;//autocomplete
subordinateto_bousermastersoptions:any;//autocomplete
subordinateto_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmssubordinatedetailshowOption:boolean;
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
private hrmssubordinatedetailservice: hrmssubordinatedetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
private bousermasterservice:bousermasterService,
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
this.hrmssubordinatedetailForm  = this.fb.group({
pk:[null],
employeeid: [null],
subid: [null],
roleid: [null],
roleiddesc: [null],
subordinateto: [null],
subordinatetodesc: [null],
fromdate: [null],
todate: [null],
kraid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmssubordinatedetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmssubordinatedetailForm.dirty && this.hrmssubordinatedetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.subid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.subid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.subid && pkDetail) {
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
let hrmssubordinatedetailid = null;

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
this.formid=hrmssubordinatedetailid;
//this.sharedService.alert(hrmssubordinatedetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.bousermasterservice.getbousermastersList().then(res => 
{
this.subordinatetoList = res as bousermaster[];
if(this.hrmssubordinatedetailservice.formData && this.hrmssubordinatedetailservice.formData.subordinateto){
this.subordinatetooptionsEvent.emit(this.subordinatetoList);
this.hrmssubordinatedetailForm.patchValue({
    subordinateto: this.hrmssubordinatedetailservice.formData.subordinateto,
    subordinatetodesc: this.hrmssubordinatedetailservice.formData.subordinatetodesc,
});
}
{
let arrsubordinateto = this.subordinatetoList.filter(v => v.userid == this.hrmssubordinatedetailForm.get('subordinateto').value);
let objsubordinateto;
if (arrsubordinateto.length > 0) objsubordinateto = arrsubordinateto[0];
if (objsubordinateto)
{
}
}
}
).catch((err) => {console.log(err);});
this.subordinateto_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.subordinatetoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.subordinateto_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmssubordinatedetailservice.gethrmssubordinatedetailsList().then(res => {
      this.pkList = res as hrmssubordinatedetail[];
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
this.hrmssubordinatedetailForm.markAsUntouched();
this.hrmssubordinatedetailForm.markAsPristine();
}
onSelectedsubordinateto(subordinatetoDetail: any) {
if (subordinatetoDetail.userid && subordinatetoDetail) {
this.hrmssubordinatedetailForm.patchValue({
subordinateto: subordinatetoDetail.userid,
subordinatetodesc: subordinatetoDetail.username,

});

}
}




resetForm() {
if (this.hrmssubordinatedetailForm != null)
this.hrmssubordinatedetailForm.reset();
this.hrmssubordinatedetailForm.patchValue({
subordinateto: this.sessiondata.userid,
subordinatetodesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let subid = this.hrmssubordinatedetailForm.get('subid').value;
        if(subid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmssubordinatedetailservice.deletehrmssubordinatedetail(subid).then(res =>
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
    this.hrmssubordinatedetailForm.patchValue({
        subid: null
    });
    if(this.hrmssubordinatedetailservice.formData.subid!=null)this.hrmssubordinatedetailservice.formData.subid=null;
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
        else if(key=="fromdate")
this.hrmssubordinatedetailForm.patchValue({"fromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="todate")
this.hrmssubordinatedetailForm.patchValue({"todate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmssubordinatedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmssubordinatedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmssubordinatedetailForm.controls[key]!=undefined)
{
this.hrmssubordinatedetailForm.controls[key].disable({onlySelf: true});
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
employeeidonChange(evt:any){
let e=evt.value;
}
subidonChange(evt:any){
let e=evt.value;
}
roleidonChange(evt:any){
let e=evt.value;
this.hrmssubordinatedetailForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
subordinatetoonChange(evt:any){
let e=evt.value;
}
fromdateonChange(evt:any){
let e=evt.value;
}
todateonChange(evt:any){
let e=evt.value;
}
kraidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmssubordinatedetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmssubordinatedetailservice.gethrmssubordinatedetailsByEID(pkcol).then(res => {

this.hrmssubordinatedetailservice.formData=res.hrmssubordinatedetail;
let formproperty=res.hrmssubordinatedetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmssubordinatedetail.pkcol;
this.formid=res.hrmssubordinatedetail.subid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmssubordinatedetail.subid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmssubordinatedetailForm.patchValue({
employeeid: res.hrmssubordinatedetail.employeeid,
subid: res.hrmssubordinatedetail.subid,
roleid: res.hrmssubordinatedetail.roleid,
roleiddesc: res.hrmssubordinatedetail.roleiddesc,
subordinateto: res.hrmssubordinatedetail.subordinateto,
subordinatetodesc: res.hrmssubordinatedetail.subordinatetodesc,
fromdate: this.ngbDateParserFormatter.parse(res.hrmssubordinatedetail.fromdate),
todate: this.ngbDateParserFormatter.parse(res.hrmssubordinatedetail.todate),
kraid: res.hrmssubordinatedetail.kraid,
status: res.hrmssubordinatedetail.status,
statusdesc: res.hrmssubordinatedetail.statusdesc,
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
  for (let key in this.hrmssubordinatedetailForm.controls) {
    if (this.hrmssubordinatedetailForm.controls[key] != null) {
if(false)
{
if(this.hrmssubordinatedetailservice.formData!=null && this.hrmssubordinatedetailservice.formData[key]!=null  && this.hrmssubordinatedetailservice.formData[key]!='[]' && this.hrmssubordinatedetailservice.formData[key]!=undefined && this.hrmssubordinatedetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmssubordinatedetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmssubordinatedetailservice.formData!=null && this.hrmssubordinatedetailservice.formData[key]!=null   && this.hrmssubordinatedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmssubordinatedetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmssubordinatedetailservice.formData!=null && this.hrmssubordinatedetailservice.formData[key]!=null   && this.hrmssubordinatedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmssubordinatedetailservice.formData[key]+"'><div class='progress__number'>"+this.hrmssubordinatedetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmssubordinatedetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmssubordinatedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmssubordinatedetailForm.value;
obj.fromdate=new Date(this.hrmssubordinatedetailForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmssubordinatedetailForm.get('fromdate').value)+'  UTC' :null);
obj.todate=new Date(this.hrmssubordinatedetailForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmssubordinatedetailForm.get('todate').value)+'  UTC' :null);
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

private hrmssubordinatedetailtoggleOption(){
this.hrmssubordinatedetailshowOption = this.hrmssubordinatedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmssubordinatedetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmssubordinatedetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmssubordinatedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmssubordinatedetailservice.formData=this.hrmssubordinatedetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmssubordinatedetailForm.controls[key] != null)
    {
        this.hrmssubordinatedetailservice.formData[key] = this.hrmssubordinatedetailForm.controls[key].value;
    }
}
}
}
this.hrmssubordinatedetailservice.formData.fromdate=new Date(this.hrmssubordinatedetailForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmssubordinatedetailForm.get('fromdate').value)+'  UTC' :null);
this.hrmssubordinatedetailservice.formData.todate=new Date(this.hrmssubordinatedetailForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmssubordinatedetailForm.get('todate').value)+'  UTC' :null);
console.log(this.hrmssubordinatedetailservice.formData);
this.hrmssubordinatedetailservice.formData=this.hrmssubordinatedetailForm.value;
this.hrmssubordinatedetailservice.saveOrUpdatehrmssubordinatedetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmssubordinatedetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmssubordinatedetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmssubordinatedetail);
}
else
{
this.FillData(res);
}
}
this.hrmssubordinatedetailForm.markAsUntouched();
this.hrmssubordinatedetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmssubordinatedetailForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubordinateto( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmssubordinatedetailForm.get('subordinateto').value, ScreenType:2 }
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



