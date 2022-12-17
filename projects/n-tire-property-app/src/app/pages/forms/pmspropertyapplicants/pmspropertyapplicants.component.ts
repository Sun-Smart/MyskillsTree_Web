import { pmspropertyapplicantsService } from './../../../service/pmspropertyapplicants.service';
import { pmspropertyapplicants } from './../../../model/pmspropertyapplicants.model';
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
selector: 'app-pmspropertyapplicants',
templateUrl: './pmspropertyapplicants.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertyapplicantsComponent implements OnInit {
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
bfilterPopulatepmspropertyapplicants:boolean=false;
 pmspropertyapplicantsForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmspropertyapplicantsshowOption:boolean;
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
private pmspropertyapplicantsservice: pmspropertyapplicantsService,
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
this.pmspropertyapplicantsForm  = this.fb.group({
pk:[null],
applicantid: [null],
propertyid: [null],
unitid: [null],
firstname: [null],
lastname: [null],
iscompany: [null],
companyname: [null],
dateofbirth: [null],
identityno: [null],
gender: [null],
email: [null],
phone: [null],
license: [null],
occupants: [null],
preferredmoveindate: [null],
shortbio: [null],
vehicledetails: [null],
petdetails: [null],
currentpropertymoveindate: [null],
currentpropertymoveoutdate: [null],
address: [null],
landlordfirstname: [null],
landlordlastname: [null],
landlordemail: [null],
landlordphone: [null],
employer: [null],
position: [null],
joineddate: [null],
enddate: [null],
workemail: [null],
workphone: [null],
officephone: [null],
officeaddress: [null],
monthlyincome: [null],
supervisorfirstname: [null],
supervisorlastname: [null],
supervisoremail: [null],
supervisorphone: [null],
additionalincome: [null],
ecfirstname: [null],
eclastname: [null],
ecemail: [null],
ecphone: [null],
relationshipdetails: [null],
referencefirstname: [null],
referencelastname: [null],
referenceemail: [null],
referencephone: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyapplicantsForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertyapplicantsForm.dirty && this.pmspropertyapplicantsForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.applicantid && pkDetail) {
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
let pmspropertyapplicantsid = null;

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
this.formid=pmspropertyapplicantsid;
//this.sharedService.alert(pmspropertyapplicantsid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.pmspropertyapplicantsservice.getpmspropertyapplicantsList().then(res => {
      this.pkList = res as pmspropertyapplicants[];
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
this.pmspropertyapplicantsForm.markAsUntouched();
this.pmspropertyapplicantsForm.markAsPristine();
}



resetForm() {
if (this.pmspropertyapplicantsForm != null)
this.pmspropertyapplicantsForm.reset();
this.pmspropertyapplicantsForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let applicantid = this.pmspropertyapplicantsForm.get('applicantid').value;
        if(applicantid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertyapplicantsservice.deletepmspropertyapplicants(applicantid).then(res =>
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
    this.pmspropertyapplicantsForm.patchValue({
        applicantid: null
    });
    if(this.pmspropertyapplicantsservice.formData.applicantid!=null)this.pmspropertyapplicantsservice.formData.applicantid=null;
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
        else if(key=="dateofbirth")
this.pmspropertyapplicantsForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="preferredmoveindate")
this.pmspropertyapplicantsForm.patchValue({"preferredmoveindate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="currentpropertymoveindate")
this.pmspropertyapplicantsForm.patchValue({"currentpropertymoveindate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="currentpropertymoveoutdate")
this.pmspropertyapplicantsForm.patchValue({"currentpropertymoveoutdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="joineddate")
this.pmspropertyapplicantsForm.patchValue({"joineddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.pmspropertyapplicantsForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmspropertyapplicantsForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyapplicantsForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyapplicantsForm.controls[key]!=undefined)
{
this.pmspropertyapplicantsForm.controls[key].disable({onlySelf: true});
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

editpmspropertyapplicants() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertyapplicantsservice.getpmspropertyapplicantsByEID(pkcol).then(res => {

this.pmspropertyapplicantsservice.formData=res.pmspropertyapplicants;
let formproperty=res.pmspropertyapplicants.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmspropertyapplicants.pkcol;
this.formid=res.pmspropertyapplicants.applicantid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmspropertyapplicants.applicantid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertyapplicantsForm.patchValue({
applicantid: res.pmspropertyapplicants.applicantid,
propertyid: res.pmspropertyapplicants.propertyid,
unitid: res.pmspropertyapplicants.unitid,
firstname: res.pmspropertyapplicants.firstname,
lastname: res.pmspropertyapplicants.lastname,
iscompany: res.pmspropertyapplicants.iscompany,
companyname: res.pmspropertyapplicants.companyname,
dateofbirth: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.dateofbirth),
identityno: res.pmspropertyapplicants.identityno,
gender: res.pmspropertyapplicants.gender,
email: res.pmspropertyapplicants.email,
phone: res.pmspropertyapplicants.phone,
license: res.pmspropertyapplicants.license,
occupants: res.pmspropertyapplicants.occupants,
preferredmoveindate: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.preferredmoveindate),
shortbio: res.pmspropertyapplicants.shortbio,
vehicledetails: res.pmspropertyapplicants.vehicledetails,
petdetails: res.pmspropertyapplicants.petdetails,
currentpropertymoveindate: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.currentpropertymoveindate),
currentpropertymoveoutdate: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.currentpropertymoveoutdate),
address: res.pmspropertyapplicants.address,
landlordfirstname: res.pmspropertyapplicants.landlordfirstname,
landlordlastname: res.pmspropertyapplicants.landlordlastname,
landlordemail: res.pmspropertyapplicants.landlordemail,
landlordphone: res.pmspropertyapplicants.landlordphone,
employer: res.pmspropertyapplicants.employer,
position: res.pmspropertyapplicants.position,
joineddate: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.joineddate),
enddate: this.ngbDateParserFormatter.parse(res.pmspropertyapplicants.enddate),
workemail: res.pmspropertyapplicants.workemail,
workphone: res.pmspropertyapplicants.workphone,
officephone: res.pmspropertyapplicants.officephone,
officeaddress: res.pmspropertyapplicants.officeaddress,
monthlyincome: res.pmspropertyapplicants.monthlyincome,
supervisorfirstname: res.pmspropertyapplicants.supervisorfirstname,
supervisorlastname: res.pmspropertyapplicants.supervisorlastname,
supervisoremail: res.pmspropertyapplicants.supervisoremail,
supervisorphone: res.pmspropertyapplicants.supervisorphone,
additionalincome: res.pmspropertyapplicants.additionalincome,
ecfirstname: res.pmspropertyapplicants.ecfirstname,
eclastname: res.pmspropertyapplicants.eclastname,
ecemail: res.pmspropertyapplicants.ecemail,
ecphone: res.pmspropertyapplicants.ecphone,
relationshipdetails: res.pmspropertyapplicants.relationshipdetails,
referencefirstname: res.pmspropertyapplicants.referencefirstname,
referencelastname: res.pmspropertyapplicants.referencelastname,
referenceemail: res.pmspropertyapplicants.referenceemail,
referencephone: res.pmspropertyapplicants.referencephone,
status: res.pmspropertyapplicants.status,
statusdesc: res.pmspropertyapplicants.statusdesc,
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
  for (let key in this.pmspropertyapplicantsForm.controls) {
    if (this.pmspropertyapplicantsForm.controls[key] != null) {
if(false)
{
if(this.pmspropertyapplicantsservice.formData!=null && this.pmspropertyapplicantsservice.formData[key]!=null  && this.pmspropertyapplicantsservice.formData[key]!='[]' && this.pmspropertyapplicantsservice.formData[key]!=undefined && this.pmspropertyapplicantsservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyapplicantsservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmspropertyapplicantsservice.formData!=null && this.pmspropertyapplicantsservice.formData[key]!=null   && this.pmspropertyapplicantsservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertyapplicantsservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertyapplicantsservice.formData!=null && this.pmspropertyapplicantsservice.formData[key]!=null   && this.pmspropertyapplicantsservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertyapplicantsservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertyapplicantsservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyapplicantsForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertyapplicantsForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertyapplicantsForm.value;
obj.dateofbirth=new Date(this.pmspropertyapplicantsForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('dateofbirth').value)+'  UTC' :null);
obj.preferredmoveindate=new Date(this.pmspropertyapplicantsForm.get('preferredmoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('preferredmoveindate').value)+'  UTC' :null);
obj.currentpropertymoveindate=new Date(this.pmspropertyapplicantsForm.get('currentpropertymoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('currentpropertymoveindate').value)+'  UTC' :null);
obj.currentpropertymoveoutdate=new Date(this.pmspropertyapplicantsForm.get('currentpropertymoveoutdate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('currentpropertymoveoutdate').value)+'  UTC' :null);
obj.joineddate=new Date(this.pmspropertyapplicantsForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('joineddate').value)+'  UTC' :null);
obj.enddate=new Date(this.pmspropertyapplicantsForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('enddate').value)+'  UTC' :null);
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

private pmspropertyapplicantstoggleOption(){
this.pmspropertyapplicantsshowOption = this.pmspropertyapplicantsshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyapplicantsForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyapplicantsForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyapplicantsForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertyapplicantsservice.formData=this.pmspropertyapplicantsForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyapplicantsForm.controls[key] != null)
    {
        this.pmspropertyapplicantsservice.formData[key] = this.pmspropertyapplicantsForm.controls[key].value;
    }
}
}
}
this.pmspropertyapplicantsservice.formData.dateofbirth=new Date(this.pmspropertyapplicantsForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('dateofbirth').value)+'  UTC' :null);
this.pmspropertyapplicantsservice.formData.preferredmoveindate=new Date(this.pmspropertyapplicantsForm.get('preferredmoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('preferredmoveindate').value)+'  UTC' :null);
this.pmspropertyapplicantsservice.formData.currentpropertymoveindate=new Date(this.pmspropertyapplicantsForm.get('currentpropertymoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('currentpropertymoveindate').value)+'  UTC' :null);
this.pmspropertyapplicantsservice.formData.currentpropertymoveoutdate=new Date(this.pmspropertyapplicantsForm.get('currentpropertymoveoutdate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('currentpropertymoveoutdate').value)+'  UTC' :null);
this.pmspropertyapplicantsservice.formData.joineddate=new Date(this.pmspropertyapplicantsForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('joineddate').value)+'  UTC' :null);
this.pmspropertyapplicantsservice.formData.enddate=new Date(this.pmspropertyapplicantsForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyapplicantsForm.get('enddate').value)+'  UTC' :null);
console.log(this.pmspropertyapplicantsservice.formData);
this.pmspropertyapplicantsservice.formData=this.pmspropertyapplicantsForm.value;
this.pmspropertyapplicantsservice.saveOrUpdatepmspropertyapplicants().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyapplicants);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertyapplicantsservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyapplicants);
}
else
{
this.FillData(res);
}
}
this.pmspropertyapplicantsForm.markAsUntouched();
this.pmspropertyapplicantsForm.markAsPristine();
},
err => {
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



