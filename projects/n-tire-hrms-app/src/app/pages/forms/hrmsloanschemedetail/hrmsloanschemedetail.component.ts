import { hrmsloanschemedetailService } from './../../../service/hrmsloanschemedetail.service';
import { hrmsloanschemedetail } from './../../../model/hrmsloanschemedetail.model';
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
selector: 'app-hrmsloanschemedetail',
templateUrl: './hrmsloanschemedetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsloanschemedetailComponent implements OnInit {
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
bfilterPopulatehrmsloanschemedetails:boolean=false;
datahrmsloanschemedetailsroleid3:any=[];
 hrmsloanschemedetailForm: FormGroup;
roleidList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsloanschemedetailshowOption:boolean;
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
private hrmsloanschemedetailservice: hrmsloanschemedetailService,
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
this.hrmsloanschemedetailForm  = this.fb.group({
pk:[null],
schemeid: [null],
detailid: [null],
roleid: [null],
roleiddesc: [null],
maxeligibleamount: [null],
maximumtimes: [null],
interestrate: [null],
maximuminstallment: [null],
restrictotherloan: [null],
noexistingloan: [null],
allowdeferral: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsloanschemedetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsloanschemedetailForm.dirty && this.hrmsloanschemedetailForm.touched ) {
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
????let??pos??=??this.pkList.map(function(e:any)??{??return e.detailid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.detailid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.detailid && pkDetail) {
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
let hrmsloanschemedetailid = null;

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
this.formid=hrmsloanschemedetailid;
//this.sharedService.alert(hrmsloanschemedetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("r").then(res => this.roleidList = res as boconfigvalue[]);

//autocomplete
    this.hrmsloanschemedetailservice.gethrmsloanschemedetailsList().then(res => {
      this.pkList = res as hrmsloanschemedetail[];
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
this.hrmsloanschemedetailForm.markAsUntouched();
this.hrmsloanschemedetailForm.markAsPristine();
}



resetForm() {
if (this.hrmsloanschemedetailForm != null)
this.hrmsloanschemedetailForm.reset();
this.hrmsloanschemedetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let detailid = this.hrmsloanschemedetailForm.get('detailid').value;
        if(detailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsloanschemedetailservice.deletehrmsloanschemedetail(detailid).then(res =>
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
    this.hrmsloanschemedetailForm.patchValue({
        detailid: null
    });
    if(this.hrmsloanschemedetailservice.formData.detailid!=null)this.hrmsloanschemedetailservice.formData.detailid=null;
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
this.hrmsloanschemedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsloanschemedetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsloanschemedetailForm.controls[key]!=undefined)
{
this.hrmsloanschemedetailForm.controls[key].disable({onlySelf: true});
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
roleidonChange(evt:any){
let e=this.f.roleid.value as any;
this.hrmsloanschemedetailForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}

edithrmsloanschemedetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsloanschemedetailservice.gethrmsloanschemedetailsByEID(pkcol).then(res => {

this.hrmsloanschemedetailservice.formData=res.hrmsloanschemedetail;
let formproperty=res.hrmsloanschemedetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsloanschemedetail.pkcol;
this.formid=res.hrmsloanschemedetail.detailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsloanschemedetail.detailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsloanschemedetailForm.patchValue({
schemeid: res.hrmsloanschemedetail.schemeid,
detailid: res.hrmsloanschemedetail.detailid,
roleid: res.hrmsloanschemedetail.roleid,
roleiddesc: res.hrmsloanschemedetail.roleiddesc,
maxeligibleamount: res.hrmsloanschemedetail.maxeligibleamount,
maximumtimes: res.hrmsloanschemedetail.maximumtimes,
interestrate: res.hrmsloanschemedetail.interestrate,
maximuminstallment: res.hrmsloanschemedetail.maximuminstallment,
restrictotherloan: res.hrmsloanschemedetail.restrictotherloan,
noexistingloan: res.hrmsloanschemedetail.noexistingloan,
allowdeferral: res.hrmsloanschemedetail.allowdeferral,
status: res.hrmsloanschemedetail.status,
statusdesc: res.hrmsloanschemedetail.statusdesc,
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
  for (let key in this.hrmsloanschemedetailForm.controls) {
    if (this.hrmsloanschemedetailForm.controls[key] != null) {
if(false)
{
if(this.hrmsloanschemedetailservice.formData!=null && this.hrmsloanschemedetailservice.formData[key]!=null  && this.hrmsloanschemedetailservice.formData[key]!='[]' && this.hrmsloanschemedetailservice.formData[key]!=undefined && this.hrmsloanschemedetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsloanschemedetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsloanschemedetailservice.formData!=null && this.hrmsloanschemedetailservice.formData[key]!=null   && this.hrmsloanschemedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsloanschemedetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsloanschemedetailservice.formData!=null && this.hrmsloanschemedetailservice.formData[key]!=null   && this.hrmsloanschemedetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsloanschemedetailservice.formData[key]+"'><div class='progress__number'>"+this.hrmsloanschemedetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsloanschemedetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsloanschemedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsloanschemedetailForm.value;
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

private hrmsloanschemedetailtoggleOption(){
this.hrmsloanschemedetailshowOption = this.hrmsloanschemedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsloanschemedetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsloanschemedetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsloanschemedetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsloanschemedetailservice.formData=this.hrmsloanschemedetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsloanschemedetailForm.controls[key] != null)
    {
        this.hrmsloanschemedetailservice.formData[key] = this.hrmsloanschemedetailForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsloanschemedetailservice.formData);
this.hrmsloanschemedetailservice.formData=this.hrmsloanschemedetailForm.value;
this.hrmsloanschemedetailservice.saveOrUpdatehrmsloanschemedetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsloanschemedetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsloanschemedetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsloanschemedetail);
}
else
{
this.FillData(res);
}
}
this.hrmsloanschemedetailForm.markAsUntouched();
this.hrmsloanschemedetailForm.markAsPristine();
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



