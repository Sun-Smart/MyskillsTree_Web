import { erpproductattributeService } from './../../../service/erpproductattribute.service';
import { erpproductattribute } from './../../../model/erpproductattribute.model';
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
import { erpproduct} from './../../../model/erpproduct.model';
import { erpproductComponent } from './../../../pages/forms/erpproduct/erpproduct.component';
import { erpproductService } from './../../../service/erpproduct.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
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
selector: 'app-erpproductattribute',
templateUrl: './erpproductattribute.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpproductattributeComponent implements OnInit {
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
bfilterPopulateerpproductattributes:boolean=false;
dataerpproductattributesproductid3:any=[];
dataerpproductattributesoptionid3:any=[];
dataerpproductattributesvalueid3:any=[];
dataerpproductattributespriceprefix3:any=[];
 erpproductattributeForm: FormGroup;
productidList: erpproduct[];
productidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
productid_erpproductsForm: FormGroup;//autocomplete
productid_erpproductsoptions:any;//autocomplete
productid_erpproductsformatter:any;//autocomplete
optionidList: bomasterdata[];
valueidList: bosubcategorymaster[];
priceprefixList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpproductattributeshowOption:boolean;
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
private erpproductattributeservice: erpproductattributeService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpproductservice:erpproductService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.erpproductattributeForm  = this.fb.group({
pk:[null],
productattributeid: [null],
productid: [null],
productiddesc: [null],
optionid: [null],
optioniddesc: [null],
valueid: [null],
valueiddesc: [null],
price: [null],
priceprefix: [null],
priceprefixdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpproductattributeForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpproductattributeForm.dirty && this.erpproductattributeForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.productattributeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.productattributeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.productattributeid && pkDetail) {
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
let erpproductattributeid = null;

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
this.formid=erpproductattributeid;
//this.sharedService.alert(erpproductattributeid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpproductservice.geterpproductsList().then(res => 
{
this.productidList = res as erpproduct[];
if(this.erpproductattributeservice.formData && this.erpproductattributeservice.formData.productid){
this.productidoptionsEvent.emit(this.productidList);
this.erpproductattributeForm.patchValue({
    productid: this.erpproductattributeservice.formData.productid,
    productiddesc: this.erpproductattributeservice.formData.productiddesc,
});
}
{
let arrproductid = this.productidList.filter(v => v.productid == this.erpproductattributeForm.get('productid').value);
let objproductid;
if (arrproductid.length > 0) objproductid = arrproductid[0];
if (objproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.productid_erpproductsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.productidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.productid_erpproductsformatter = (result: any) => result.productname;
this.bomasterdataservice.getList("PRDAT").then(res => {
this.optionidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.optionid.value && this.f.optionid.value!="" && this.f.optionid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.optionid.value).then(res =>{
this.valueidList = res as bosubcategorymaster[];
if(this.erpproductattributeservice.formData && this.erpproductattributeservice.formData.valueid){this.erpproductattributeForm.patchValue({
    valueid: this.erpproductattributeservice.formData.valueid,
    valueiddesc: this.erpproductattributeservice.formData.valueiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("priceprefix").then(res => this.priceprefixList = res as boconfigvalue[]);

//autocomplete
    this.erpproductattributeservice.geterpproductattributesList().then(res => {
      this.pkList = res as erpproductattribute[];
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
this.erpproductattributeForm.markAsUntouched();
this.erpproductattributeForm.markAsPristine();
}
onSelectedproductid(productidDetail: any) {
if (productidDetail.productid && productidDetail) {
this.erpproductattributeForm.patchValue({
productid: productidDetail.productid,
productiddesc: productidDetail.productname,

});

}
}




resetForm() {
if (this.erpproductattributeForm != null)
this.erpproductattributeForm.reset();
this.erpproductattributeForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let productattributeid = this.erpproductattributeForm.get('productattributeid').value;
        if(productattributeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpproductattributeservice.deleteerpproductattribute(productattributeid).then(res =>
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
    this.erpproductattributeForm.patchValue({
        productattributeid: null
    });
    if(this.erpproductattributeservice.formData.productattributeid!=null)this.erpproductattributeservice.formData.productattributeid=null;
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
this.erpproductattributeForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpproductattributeForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpproductattributeForm.controls[key]!=undefined)
{
this.erpproductattributeForm.controls[key].disable({onlySelf: true});
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
productattributeidonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
}
optionidonChange(evt:any){
let e=evt.value;
this.erpproductattributeForm.patchValue({optioniddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.optionid.value && this.f.optionid.value!="" && this.f.optionid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.optionid.value).then(res => this.valueidList = res as bosubcategorymaster[]);
});
}
valueidonChange(evt:any){
let e=evt.value;
this.erpproductattributeForm.patchValue({valueiddesc:evt.options[evt.options.selectedIndex].text});
}
priceonChange(evt:any){
let e=evt.value;
}
priceprefixonChange(evt:any){
let e=this.f.priceprefix.value as any;
this.erpproductattributeForm.patchValue({priceprefixdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

editerpproductattributes() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpproductattributeservice.geterpproductattributesByEID(pkcol).then(res => {

this.erpproductattributeservice.formData=res.erpproductattribute;
let formproperty=res.erpproductattribute.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpproductattribute.pkcol;
this.formid=res.erpproductattribute.productattributeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpproductattribute.productattributeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpproductattributeForm.patchValue({
productattributeid: res.erpproductattribute.productattributeid,
productid: res.erpproductattribute.productid,
productiddesc: res.erpproductattribute.productiddesc,
optionid: res.erpproductattribute.optionid,
optioniddesc: res.erpproductattribute.optioniddesc,
valueid: res.erpproductattribute.valueid,
valueiddesc: res.erpproductattribute.valueiddesc,
price: res.erpproductattribute.price,
priceprefix: res.erpproductattribute.priceprefix,
priceprefixdesc: res.erpproductattribute.priceprefixdesc,
status: res.erpproductattribute.status,
statusdesc: res.erpproductattribute.statusdesc,
});
setTimeout(() => {
if(this.f.optionid.value && this.f.optionid.value!="" && this.f.optionid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.optionid.value).then(res =>{
this.valueidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
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
  for (let key in this.erpproductattributeForm.controls) {
    if (this.erpproductattributeForm.controls[key] != null) {
if(false)
{
if(this.erpproductattributeservice.formData!=null && this.erpproductattributeservice.formData[key]!=null  && this.erpproductattributeservice.formData[key]!='[]' && this.erpproductattributeservice.formData[key]!=undefined && this.erpproductattributeservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpproductattributeservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpproductattributeservice.formData!=null && this.erpproductattributeservice.formData[key]!=null   && this.erpproductattributeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpproductattributeservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpproductattributeservice.formData!=null && this.erpproductattributeservice.formData[key]!=null   && this.erpproductattributeservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpproductattributeservice.formData[key]+"'><div class='progress__number'>"+this.erpproductattributeservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpproductattributeForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpproductattributeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpproductattributeForm.value;
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

private erpproductattributetoggleOption(){
this.erpproductattributeshowOption = this.erpproductattributeshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpproductattributeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpproductattributeForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpproductattributeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpproductattributeservice.formData=this.erpproductattributeForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpproductattributeForm.controls[key] != null)
    {
        this.erpproductattributeservice.formData[key] = this.erpproductattributeForm.controls[key].value;
    }
}
}
}
console.log(this.erpproductattributeservice.formData);
this.erpproductattributeservice.formData=this.erpproductattributeForm.value;
this.erpproductattributeservice.saveOrUpdateerpproductattributes().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpproductattribute);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpproductattributeservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpproductattribute);
}
else
{
this.FillData(res);
}
}
this.erpproductattributeForm.markAsUntouched();
this.erpproductattributeForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(erpproductComponent, 
{
data: {productid:this.erpproductattributeForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditoptionid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erpproductattributeForm.get('optionid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditvalueid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.erpproductattributeForm.get('valueid').value, ScreenType:2 }
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



