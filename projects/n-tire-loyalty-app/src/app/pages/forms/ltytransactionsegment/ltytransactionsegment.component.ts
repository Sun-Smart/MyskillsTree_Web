import { ltytransactionsegmentService } from './../../../service/ltytransactionsegment.service';
import { ltytransactionsegment } from './../../../model/ltytransactionsegment.model';
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
import { QueryBuilderConfig } from 'angular2-query-builder';
import { ltyproductsegmentService } from './../../../service/ltyproductsegment.service';
import { ltyproductsegment } from './../../../model/ltyproductsegment.model';
//custom fields & attachments

@Component({
selector: 'app-ltytransactionsegment',
templateUrl: './ltytransactionsegment.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltytransactionsegmentComponent implements OnInit {
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
bfilterPopulateltytransactionsegments:boolean=false;
dataltytransactionsegmentstype3:any=[];
dataltytransactionsegmentsvalidity3:any=[];
config: QueryBuilderConfig;
labelsqList: boconfigvalue[];
labelsarr: any[]=[];
purchasedproductsegmentqList: ltyproductsegment[];
purchasedproductsegmentarr: any[]=[];
weekdayqList: boconfigvalue[];
weekdayarr: any[]=[];
daysqList: boconfigvalue[];
daysarr: any[]=[];
weekqList: boconfigvalue[];
weekarr: any[]=[];
 ltytransactionsegmentForm: FormGroup;
typeList: boconfigvalue[];
validityList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
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
private ltytransactionsegmentservice: ltytransactionsegmentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private ltyproductsegmentservice:ltyproductsegmentService,
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
this.ltytransactionsegmentForm  = this.fb.group({
pk:[null],
segmentid: [null],
name: [null],
description: [null],
type: [null],
typedesc: [null],
rank: [null],
excludeddeliverycosts: [null],
multiplier: [null],
validity: [null],
validitydesc: [null],
condition: [null],
totalcustomers: [null],
avgtransactionamount: [null],
avgtransactions: [null],
avgclv: [null],
status: [null],
statusdesc: [null],
query:[null],
});
}

get f() { return this.ltytransactionsegmentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltytransactionsegmentForm.dirty && this.ltytransactionsegmentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.segmentid && pkDetail) {
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
let ltytransactionsegmentid = null;

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
this.formid=ltytransactionsegmentid;
//this.sharedService.alert(ltytransactionsegmentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("segmenttype").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("ltytransactionvalidity").then(res => this.validityList = res as boconfigvalue[]);

//autocomplete
    this.ltytransactionsegmentservice.getltytransactionsegmentsList().then(res => {
      this.pkList = res as ltytransactionsegment[];
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

this.configservice.getList("transactionlabel").then(res => {
      this.labelsqList = res as boconfigvalue[];
      for (const obj of this.labelsqList) {
        this.labelsarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    this.ltyproductsegmentservice.getltyproductsegmentsList().then(res => {
      this.purchasedproductsegmentqList = res as ltyproductsegment[];
      for (const obj of this.purchasedproductsegmentqList) {
        this.purchasedproductsegmentarr.push({name:obj.name,value:obj.segmentid});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("weekday").then(res => {
      this.weekdayqList = res as boconfigvalue[];
      for (const obj of this.weekdayqList) {
        this.weekdayarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("days").then(res => {
      this.daysqList = res as boconfigvalue[];
      for (const obj of this.daysqList) {
        this.daysarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
this.configservice.getList("week").then(res => {
      this.weekqList = res as boconfigvalue[];
      for (const obj of this.weekqList) {
        this.weekarr.push({name:obj.configtext,value:obj.configkey});
      }
    }
    ).catch((err) => {console.log(err);});
    setTimeout(() => {
    this.config = {
      fields: {
        purchasedproductsegment: {
          name: 'Purchased Product Segment',
          type: 'category',
          options:this.purchasedproductsegmentarr
        },
        ordervalue: {
          name: 'Order Value',
          type: 'number',
        },
        startdate: {
          name: 'Start Date',
          type: 'date',
        },
        enddate: {
          name: 'End Date',
          type: 'date',
        },
        starttime: {
          name: 'Start Time',
          type: 'time',
        },
        endtime: {
          name: 'End Time',
          type: 'time',
        },
        weekday: {
          name: 'Week Day',
          type: 'category',
          options:this.weekdayarr
        },
        days: {
          name: 'Days',
          type: 'category',
          options:this.daysarr
        },
        week: {
          name: 'Week',
          type: 'category',
          options:this.weekarr
        },
        numberofpurchases: {
          name: 'Number of Purchases',
          type: 'number',
        },
      }
    };
for (const obj of this.labelsarr) {
(this.config as any).fields[obj.name]={"name":obj.name,"type": "string"};
}
if (this.ltytransactionsegmentForm.get('condition').value != null)
{

    this.ltytransactionsegmentForm.patchValue({
    query: JSON.parse(this.ltytransactionsegmentForm.get('condition').value)
});
}
  },500);
//setting the flag that the screen is not touched 
this.ltytransactionsegmentForm.markAsUntouched();
this.ltytransactionsegmentForm.markAsPristine();
}



resetForm() {
if (this.ltytransactionsegmentForm != null)
this.ltytransactionsegmentForm.reset();
this.ltytransactionsegmentForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let segmentid = this.ltytransactionsegmentForm.get('segmentid').value;
        if(segmentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltytransactionsegmentservice.deleteltytransactionsegment(segmentid).then(res =>
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
    this.ltytransactionsegmentForm.patchValue({
        segmentid: null
    });
    if(this.ltytransactionsegmentservice.formData.segmentid!=null)this.ltytransactionsegmentservice.formData.segmentid=null;
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
  else if(key=="query"){
  }
else if(key=="criteria"){
this.ltytransactionsegmentForm.patchValue({"criteria":  mainscreendata[key] } );
  }
        else if(ctrltype=="string")
{
this.ltytransactionsegmentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltytransactionsegmentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltytransactionsegmentForm.controls[key]!=undefined)this.ltytransactionsegmentForm.controls[key].disable({onlySelf: true});
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
typeonChange(evt:any){
let e=this.f.type.value as any;
this.ltytransactionsegmentForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
validityonChange(evt:any){
let e=this.f.validity.value as any;
this.ltytransactionsegmentForm.patchValue({validitydesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.ltytransactionsegmentservice.getltytransactionsegmentsByEID(pkcol).then(res => {

this.ltytransactionsegmentservice.formData=res.ltytransactionsegment;
let formproperty=res.ltytransactionsegment.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltytransactionsegment.pkcol;
this.formid=res.ltytransactionsegment.segmentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltytransactionsegment.segmentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltytransactionsegmentForm.patchValue({
segmentid: res.ltytransactionsegment.segmentid,
name: res.ltytransactionsegment.name,
description: res.ltytransactionsegment.description,
type: res.ltytransactionsegment.type,
typedesc: res.ltytransactionsegment.typedesc,
rank: res.ltytransactionsegment.rank,
excludeddeliverycosts: res.ltytransactionsegment.excludeddeliverycosts,
multiplier: res.ltytransactionsegment.multiplier,
validity: res.ltytransactionsegment.validity,
validitydesc: res.ltytransactionsegment.validitydesc,
condition: res.ltytransactionsegment.condition,
totalcustomers: res.ltytransactionsegment.totalcustomers,
avgtransactionamount: res.ltytransactionsegment.avgtransactionamount,
avgtransactions: res.ltytransactionsegment.avgtransactions,
avgclv: res.ltytransactionsegment.avgclv,
status: res.ltytransactionsegment.status,
statusdesc: res.ltytransactionsegment.statusdesc,
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
  for (let key in this.ltytransactionsegmentForm.controls) {
    if (this.ltytransactionsegmentForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltytransactionsegmentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltytransactionsegmentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
this.ltytransactionsegmentForm.patchValue({
condition: JSON.stringify(this.ltytransactionsegmentForm.get('query').value)
});
var obj=this.ltytransactionsegmentForm.value;
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.ltytransactionsegmentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltytransactionsegmentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltytransactionsegmentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltytransactionsegmentservice.formData=this.ltytransactionsegmentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltytransactionsegmentForm.controls[key] != null)
    {
        this.ltytransactionsegmentservice.formData[key] = this.ltytransactionsegmentForm.controls[key].value;
    }
}
}
}
this.ltytransactionsegmentForm.patchValue({
condition: JSON.stringify(this.ltytransactionsegmentForm.get('query').value)
});
console.log(this.ltytransactionsegmentservice.formData);
this.ltytransactionsegmentservice.formData=this.ltytransactionsegmentForm.value;
this.ltytransactionsegmentservice.saveOrUpdateltytransactionsegments().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltytransactionsegment);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltytransactionsegmentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltytransactionsegment);
}
else
{
this.FillData(res);
}
}
this.ltytransactionsegmentForm.markAsUntouched();
this.ltytransactionsegmentForm.markAsPristine();
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



