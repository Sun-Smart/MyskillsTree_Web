import { hlpslasupporthourService } from './../../../service/hlpslasupporthour.service';
import { hlpslasupporthour } from './../../../model/hlpslasupporthour.model';
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
selector: 'app-hlpslasupporthour',
templateUrl: './hlpslasupporthour.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hlpslasupporthourComponent implements OnInit {
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
bfilterPopulatehlpslasupporthours:boolean=false;
datahlpslasupporthoursweekday3:any=[];
 hlpslasupporthourForm: FormGroup;
weekdayList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hlpslasupporthourshowOption:boolean;
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
private hlpslasupporthourservice: hlpslasupporthourService,
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
this.hlpslasupporthourForm  = this.fb.group({
pk:[null],
supportid: [null],
servicelevelid: [null],
weekday: [null],
weekdaydesc: [null],
starttime: [null],
endtime: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hlpslasupporthourForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hlpslasupporthourForm.dirty && this.hlpslasupporthourForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supportid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supportid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supportid && pkDetail) {
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
let hlpslasupporthourid = null;

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
this.formid=hlpslasupporthourid;
//this.sharedService.alert(hlpslasupporthourid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("weekday").then(res => this.weekdayList = res as boconfigvalue[]);

//autocomplete
    this.hlpslasupporthourservice.gethlpslasupporthoursList().then(res => {
      this.pkList = res as hlpslasupporthour[];
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
this.hlpslasupporthourForm.markAsUntouched();
this.hlpslasupporthourForm.markAsPristine();
}



resetForm() {
if (this.hlpslasupporthourForm != null)
this.hlpslasupporthourForm.reset();
this.hlpslasupporthourForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supportid = this.hlpslasupporthourForm.get('supportid').value;
        if(supportid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpslasupporthourservice.deletehlpslasupporthour(supportid).then(res =>
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
    this.hlpslasupporthourForm.patchValue({
        supportid: null
    });
    if(this.hlpslasupporthourservice.formData.supportid!=null)this.hlpslasupporthourservice.formData.supportid=null;
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
        else if(key=="starttime")
this.hlpslasupporthourForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="endtime")
this.hlpslasupporthourForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hlpslasupporthourForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hlpslasupporthourForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hlpslasupporthourForm.controls[key]!=undefined)
{
this.hlpslasupporthourForm.controls[key].disable({onlySelf: true});
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
weekdayonChange(evt:any){
let e=this.f.weekday.value as any;
this.hlpslasupporthourForm.patchValue({weekdaydesc:evt.options[evt.options.selectedIndex].text});
}

edithlpslasupporthours() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hlpslasupporthourservice.gethlpslasupporthoursByEID(pkcol).then(res => {

this.hlpslasupporthourservice.formData=res.hlpslasupporthour;
let formproperty=res.hlpslasupporthour.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hlpslasupporthour.pkcol;
this.formid=res.hlpslasupporthour.supportid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.hlpslasupporthourservice.formData=res.hlpslasupporthour;
this.formid=res.hlpslasupporthour.supportid;
var starttimeTime=new Time( res.hlpslasupporthour.starttime);
var endtimeTime=new Time( res.hlpslasupporthour.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hlpslasupporthourForm.patchValue({
supportid: res.hlpslasupporthour.supportid,
servicelevelid: res.hlpslasupporthour.servicelevelid,
weekday: res.hlpslasupporthour.weekday,
weekdaydesc: res.hlpslasupporthour.weekdaydesc,
starttime: starttimeTime,
endtime: endtimeTime,
status: res.hlpslasupporthour.status,
statusdesc: res.hlpslasupporthour.statusdesc,
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
  for (let key in this.hlpslasupporthourForm.controls) {
    if (this.hlpslasupporthourForm.controls[key] != null) {
if(false)
{
if(this.hlpslasupporthourservice.formData!=null && this.hlpslasupporthourservice.formData[key]!=null  && this.hlpslasupporthourservice.formData[key]!='[]' && this.hlpslasupporthourservice.formData[key]!=undefined && this.hlpslasupporthourservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hlpslasupporthourservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hlpslasupporthourservice.formData!=null && this.hlpslasupporthourservice.formData[key]!=null   && this.hlpslasupporthourservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hlpslasupporthourservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hlpslasupporthourservice.formData!=null && this.hlpslasupporthourservice.formData[key]!=null   && this.hlpslasupporthourservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hlpslasupporthourservice.formData[key]+"'><div class='progress__number'>"+this.hlpslasupporthourservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpslasupporthourForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hlpslasupporthourForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hlpslasupporthourForm.value;
obj.starttime=(this.hlpslasupporthourForm.get('starttime').value==null?0:this.hlpslasupporthourForm.get('starttime').value.hour)+':'+(this.hlpslasupporthourForm.get('starttime').value==null?0:this.hlpslasupporthourForm.get('starttime').value.minute+":00");
obj.endtime=(this.hlpslasupporthourForm.get('endtime').value==null?0:this.hlpslasupporthourForm.get('endtime').value.hour)+':'+(this.hlpslasupporthourForm.get('endtime').value==null?0:this.hlpslasupporthourForm.get('endtime').value.minute+":00");
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

private hlpslasupporthourtoggleOption(){
this.hlpslasupporthourshowOption = this.hlpslasupporthourshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hlpslasupporthourForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hlpslasupporthourForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hlpslasupporthourForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hlpslasupporthourservice.formData=this.hlpslasupporthourForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hlpslasupporthourForm.controls[key] != null)
    {
        this.hlpslasupporthourservice.formData[key] = this.hlpslasupporthourForm.controls[key].value;
    }
}
}
}
this.hlpslasupporthourservice.formData.starttime=(this.hlpslasupporthourForm.get('starttime').value==null?0:this.hlpslasupporthourForm.get('starttime').value.hour)+':'+(this.hlpslasupporthourForm.get('starttime').value==null?0:this.hlpslasupporthourForm.get('starttime').value.minute+":00");
this.hlpslasupporthourservice.formData.endtime=(this.hlpslasupporthourForm.get('endtime').value==null?0:this.hlpslasupporthourForm.get('endtime').value.hour)+':'+(this.hlpslasupporthourForm.get('endtime').value==null?0:this.hlpslasupporthourForm.get('endtime').value.minute+":00");
console.log(this.hlpslasupporthourservice.formData);
this.hlpslasupporthourservice.formData=this.hlpslasupporthourForm.value;
this.hlpslasupporthourservice.saveOrUpdatehlpslasupporthours().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpslasupporthour);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hlpslasupporthourservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hlpslasupporthour);
}
else
{
this.FillData(res);
}
}
this.hlpslasupporthourForm.markAsUntouched();
this.hlpslasupporthourForm.markAsPristine();
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



