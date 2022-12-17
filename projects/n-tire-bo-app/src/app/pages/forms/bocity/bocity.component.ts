import { bocityService } from './../../../service/bocity.service';
import { bocity } from './../../../model/bocity.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
import { bocountry} from './../../../model/bocountry.model';
import { bocountryComponent } from './../../../pages/forms/bocountry/bocountry.component';
import { bocountryService } from './../../../service/bocountry.service';
//popups
//detail table services
import { bolocation } from './../../../model/bolocation.model';
import { bolocationComponent } from './../../../pages/forms/bolocation/bolocation.component';
//FK services
import { bouserbranchaccess,IbouserbranchaccessResponse } from './../../../model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from './../../../pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from './../../../service/bouserbranchaccess.service';
import { bobranchlocation,IbobranchlocationResponse } from './../../../model/bobranchlocation.model';
import { bobranchlocationComponent } from './../../../pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from './../../../service/bobranchlocation.service';
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

@Component({
selector: 'app-bocity',
templateUrl: './bocity.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bocityComponent implements OnInit {
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
bfilterPopulatebocities:boolean=false;
databocitiescountryid3:any=[];
databolocationsbranchid3:any=[];
databolocationslocationid3:any=[];
bfilterPopulatebolocations:boolean=false;
@ViewChild('tblbolocationssource',{static:false}) tblbolocationssource: Ng2SmartTableComponent;
 bocityForm: FormGroup;
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
bocityshowOption:boolean;
bolocationshowOption:boolean;
sessiondata:any;
sourcekey:any;



bolocationsvisiblelist:any;
bolocationshidelist:any;

DeletedbolocationIDs: string="";
bolocationsID: string = "1";
bolocationsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bocityservice: bocityService,
private bouserbranchaccessservice: bouserbranchaccessService,
private bobranchlocationservice: bobranchlocationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
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
this.bocityForm  = this.fb.group({
pk:[null],
cityid: [null],
code: [null, Validators.required],
name: [null, Validators.required],
stateid: [null],
countryid: [null],
countryiddesc: [null],
metro: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bocityForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bocityForm.dirty && this.bocityForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.cityid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.cityid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.cityid && pkDetail) {
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
let bocityid = null;

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
this.formid=bocityid;
//this.sharedService.alert(bocityid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbolocationsTableConfig();
  setTimeout(() => {
  this.SetbolocationsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.bocityservice.formData && this.bocityservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.bocityForm.patchValue({
    countryid: this.bocityservice.formData.countryid,
    countryiddesc: this.bocityservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.bocityForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;

//autocomplete
    this.bocityservice.getbocitiesList().then(res => {
      this.pkList = res as bocity[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.name;

//setting the flag that the screen is not touched 
this.bocityForm.markAsUntouched();
this.bocityForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.bocityForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});

}
}




resetForm() {
if (this.bocityForm != null)
this.bocityForm.reset();
this.bocityForm.patchValue({
});
setTimeout(() => {
this.bocityservice.bolocations=[];
this.bolocationsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let cityid = this.bocityForm.get('cityid').value;
        if(cityid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bocityservice.deletebocity(cityid).then(res =>
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
    this.bocityForm.patchValue({
        cityid: null
    });
    if(this.bocityservice.formData.cityid!=null)this.bocityservice.formData.cityid=null;
for (let i=0;i<this.bocityservice.bolocations.length;i++) {
this.bocityservice.bolocations[i].locationid=null;
}
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
this.bocityForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bocityForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bocityForm.controls[key]!=undefined)
{
this.bocityForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || (this.maindata.maindatapkcol!='' && this.maindata.maindatapkcol!=null && this.maindata.maindatapkcol!=undefined)  || this.maindata.save==true  || this.bocityservice.formData.name!=null )
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
if(this.maindata==undefined || (this.maindata.maindatapkcol!='' && this.maindata.maindatapkcol!=null && this.maindata.maindatapkcol!=undefined)  || this.maindata.save==true  || this.bocityservice.formData.name!=null )
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
cityidonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
metroonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editbocities() {
this.showview=false;
setTimeout(() => {
});
return false;
}



async PopulateScreen(pkcol:any){
this.bocityservice.getbocitiesByEID(pkcol).then(res => {

this.bocityservice.formData=res.bocity;
let formproperty=res.bocity.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.bocity.pkcol;
this.formid=res.bocity.cityid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.bocityservice.formData=res.bocity;
this.formid=res.bocity.cityid;
this.pkcol=res.bocity.pkcol;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bocityForm.patchValue({
cityid: res.bocity.cityid,
code: res.bocity.code,
name: res.bocity.name,
stateid: res.bocity.stateid,
countryid: res.bocity.countryid,
countryiddesc: res.bocity.countryiddesc,
metro: res.bocity.metro,
status: res.bocity.status,
statusdesc: res.bocity.statusdesc,
});
this.bolocationsvisiblelist=res.bolocationsvisiblelist;
//Child Tables if any
this.bocityservice.bolocations = res.bolocations;
this.SetbolocationsTableConfig();
this.bolocationsLoadTable();
  setTimeout(() => {
  this.SetbolocationsTableddConfig();
  });
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
  for (let key in this.bocityForm.controls) {
let val = this.bocityForm.controls[key].value;
if (val == 'null' || val == null || val == undefined) val = '';
    if (this.bocityForm.controls[key] != null) {
if(false)
{
if(this.bocityservice.formData!=null && this.bocityservice.formData[key]!=null  && this.bocityservice.formData[key]!='[]' && this.bocityservice.formData[key]!=undefined && this.bocityservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),AppConstants.AttachmentURL+ JSON.parse(this.bocityservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.bocityservice.formData!=null && this.bocityservice.formData[key]!=null   && this.bocityservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.bocityservice.formData[key]+"></div>");
}
else if(false)
{
if(this.bocityservice.formData!=null && this.bocityservice.formData[key]!=null   && this.bocityservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.bocityservice.formData[key]+"'><div class='progress__number'>"+this.bocityservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
    }
  }
var re = /##(\w+)##/g;
ret = ret.replace(re, '');
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bocityForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bocityForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private bocitytoggleOption(){
this.bocityshowOption = this.bocityshowOption === true ? false : true;
}

private bolocationtoggleOption(){
this.bolocationshowOption = this.bolocationshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bocityForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bocityForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bocityForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bocityservice.formData=this.bocityForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bocityForm.controls[key] != null)
    {
        this.bocityservice.formData[key] = this.bocityForm.controls[key].value;
    }
}
}
}
this.bocityservice.formData.DeletedbolocationIDs = this.DeletedbolocationIDs;
console.log(this.bocityservice.formData);
this.bocityservice.formData=this.bocityForm.value;
this.bocityservice.saveOrUpdatebocities().subscribe(
async res => {
if (this.bolocationssource.data)
{
    for (let i = 0; i < this.bolocationssource.data.length; i++)
    {
        if (this.bolocationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bolocationssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
if(!bclear)this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(!bclear && this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bocity);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bocityservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bocity);
}
else
{
this.FillData(res);
}
}
this.bocityForm.markAsUntouched();
this.bocityForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.bocityForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbolocation(event:any,locationid:any, cityid:any) {
let add=false;
if(event==null)add=true;
let childsave=false;
if(this.pkcol!=undefined && this.pkcol!=null)childsave=true;
this.dialog.open(bolocationComponent, 
{
data:  {  showview:false,save: childsave,maindatapkcol:this.pkcol,event,locationid, cityid,visiblelist:this.bolocationsvisiblelist,  hidelist:this.bolocationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bolocationssource.add(res);
this.bolocationssource.refresh();
}
else
{
this.bolocationssource.update(event.data, res);
}
}
});
}

onDeletebolocation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbolocationIDs += childID + ",";
this.bocityservice.bolocations.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bolocations
bolocationssettings:any;
bolocationssource: any;

showbolocationsCheckbox()
{
debugger;
if(this.tblbolocationssource.settings['selectMode']== 'multi')this.tblbolocationssource.settings['selectMode']= 'single';
else
this.tblbolocationssource.settings['selectMode']= 'multi';
this.tblbolocationssource.initGrid();
}
deletebolocationsAll()
{
this.tblbolocationssource.settings['selectMode'] = 'single';
}
showbolocationsFilter()
{
  setTimeout(() => {
  this.SetbolocationsTableddConfig();
  });
      if(this.tblbolocationssource.settings!=null)this.tblbolocationssource.settings['hideSubHeader'] =!this.tblbolocationssource.settings['hideSubHeader'];
this.tblbolocationssource.initGrid();
}
showbolocationsInActive()
{
}
enablebolocationsInActive()
{
}
async SetbolocationsTableddConfig()
{
if(!this.bfilterPopulatebolocations){

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var datalocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databolocationslocationid3.push(defaultobj);
for(let i=0; i<datalocationid2.length; i++){
var obj= { value: datalocationid2[i].locationid, title:datalocationid2[i].locationname};
this.databolocationslocationid3.push(obj);
}
if((this.tblbolocationssource.settings as any).columns['locationid'])
{
(this.tblbolocationssource.settings as any).columns['locationid'].editor.config.list=JSON.parse(JSON.stringify(this.databolocationslocationid3));
this.tblbolocationssource.initGrid();
}
});

this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databolocationsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.databolocationsbranchid3.push(obj);
}
if((this.tblbolocationssource.settings as any).columns['branchid'])
{
(this.tblbolocationssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.databolocationsbranchid3));
this.tblbolocationssource.initGrid();
}
});
}
this.bfilterPopulatebolocations=true;
}
async bolocationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbolocationsTableConfig()
{
this.bolocationssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
branchiddesc: {
title: 'Branch',
type: 'html',
filter:true,
},
code: {
title: 'Code',
type: '',
filter:true,
},
name: {
title: 'Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
postalcode: {
title: 'Postal Code',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
state: {
title: 'State',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
stateid: {
title: 'State',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
city: {
title: 'City',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
latitude: {
title: 'Latitude',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
longitude: {
title: 'Longitude',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
areadetails: {
title: 'Area Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
population: {
title: 'Population',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
},
};
}
bolocationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bolocationsID)>=0)
{
this.bolocationssource=new LocalDataSource();
this.bolocationssource.load(this.bocityservice.bolocations as  any as LocalDataSource);
this.bolocationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bolocationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocityservice.bolocations.length == 0)
{
    this.tblbolocationssource.grid.createFormShown = true;
}
else
{
    let obj = new bolocation();
    this.bocityservice.bolocations.push(obj);
    this.bolocationssource.refresh();
    if ((this.bocityservice.bolocations.length / this.bolocationssource.getPaging().perPage).toFixed(0) + 1 != this.bolocationssource.getPaging().page)
    {
        this.bolocationssource.setPage((this.bocityservice.bolocations.length / this.bolocationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbolocationssource.grid.edit(this.tblbolocationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bolocationssource.data.indexOf(event.data);
this.onDeletebolocation(event,event.data.locationid,((this.bolocationssource.getPaging().page-1) *this.bolocationssource.getPaging().perPage)+index);
this.bolocationssource.refresh();
break;
}
}

*/
bolocationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbolocation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbolocation(event,event.data.locationid,this.formid);
break;
case 'delete':
this.onDeletebolocation(event,event.data.locationid,((this.bolocationssource.getPaging().page-1) *this.bolocationssource.getPaging().perPage)+event.index);
this.bolocationssource.refresh();
break;
}
}
bolocationsonDelete(obj) {
let locationid=obj.data.locationid;
if (confirm('Are you sure to delete this record ?')) {
this.bocityservice.deletebocity(locationid).then(res=>
this.bolocationsLoadTable()
);
}
}
bolocationsPaging(val)
{
debugger;
this.bolocationssource.setPaging(1, val, true);
}

handlebolocationsGridSelected(event:any) {
this.bolocationsselectedindex=this.bocityservice.bolocations.findIndex(i => i.locationid === event.data.locationid);
}
IsbolocationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bolocationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bolocations

}



