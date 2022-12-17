import { bodynamicformService } from './../../../service/bodynamicform.service';
import { bodynamicform } from './../../../model/bodynamicform.model';
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
import { systemtable} from './../../../model/systemtable.model';
import { systemtableService } from './../../../service/systemtable.service';
//popups
//detail table services
import { bodynamicformdetail } from './../../../model/bodynamicformdetail.model';
//FK services
import { bodynamicformdetailComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bodynamicformdetail/bodynamicformdetail.component';
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

@Component({
selector: 'app-bodynamicform',
templateUrl: './bodynamicform.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodynamicformComponent implements OnInit {
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
bfilterPopulatebodynamicforms:boolean=false;
databodynamicformstableid3:any=[];
databodynamicformsformtype3:any=[];
bfilterPopulatebodynamicformdetails:boolean=false;
@ViewChild('tblbodynamicformdetailssource',{static:false}) tblbodynamicformdetailssource: Ng2SmartTableComponent;
 bodynamicformForm: FormGroup;
tableidList: systemtable[];
tableidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tableid_systemtablesForm: FormGroup;//autocomplete
tableid_systemtablesoptions:any;//autocomplete
tableid_systemtablesformatter:any;//autocomplete
formtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bodynamicformdetailsvisiblelist:any;
bodynamicformdetailshidelist:any;

DeletedbodynamicformdetailIDs: string="";
bodynamicformdetailsID: string = "1";
bodynamicformdetailsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bodynamicformservice: bodynamicformService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private systemtableservice:systemtableService,
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
this.bodynamicformForm  = this.fb.group({pk:[null],tableid: [null],
tableiddesc: [null],
conditionfield: [null],
conditionvalue: [null],
formid: [null],
formname: [null],
formtype: [null],
formtypedesc: [null],
formhtml: [null],
cols: [null],
templatehtml: [null],
hasattachments: [null],
sequence: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodynamicformForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodynamicformForm.dirty && this.bodynamicformForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.formid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.formid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.formid && pkDetail) {
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
let bodynamicformid = null;

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
this.formid=bodynamicformid;
//this.sharedService.alert(bodynamicformid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbodynamicformdetailsTableConfig();
  setTimeout(() => {
  this.SetbodynamicformdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.systemtableservice.getsystemtablesList().then(res => 
{
this.tableidList = res as systemtable[];
if(this.bodynamicformservice.formData && this.bodynamicformservice.formData.tableid){
this.tableidoptionsEvent.emit(this.tableidList);
this.bodynamicformForm.patchValue({
    tableid: this.bodynamicformservice.formData.tableid,
    tableiddesc: this.bodynamicformservice.formData.tableiddesc,
});
}
{
let arrtableid = this.tableidList.filter(v => v.tableid == this.bodynamicformForm.get('tableid').value);
let objtableid;
if (arrtableid.length > 0) objtableid = arrtableid[0];
if (objtableid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tableid_systemtablesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tableidList.filter(v => v.tablename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tableid_systemtablesformatter = (result: any) => result.tablename;
this.configservice.getList("formtype").then(res => this.formtypeList = res as boconfigvalue[]);

//autocomplete
    this.bodynamicformservice.getbodynamicformsList().then(res => {
      this.pkList = res as bodynamicform[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.formname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.formname;

//setting the flag that the screen is not touched 
this.bodynamicformForm.markAsUntouched();
this.bodynamicformForm.markAsPristine();
}
onSelectedtableid(tableidDetail: any) {
if (tableidDetail.tableid && tableidDetail) {
this.bodynamicformForm.patchValue({
tableid: tableidDetail.tableid,
tableiddesc: tableidDetail.tablename,

});

}
}




resetForm() {
if (this.bodynamicformForm != null)
this.bodynamicformForm.reset();
this.bodynamicformForm.patchValue({
});
setTimeout(() => {
this.bodynamicformservice.bodynamicformdetails=[];
this.bodynamicformdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let formid = this.bodynamicformForm.get('formid').value;
        if(formid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodynamicformservice.deletebodynamicform(formid).then(res =>
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
    this.bodynamicformForm.patchValue({
        formid: null
    });
    if(this.bodynamicformservice.formData.formid!=null)this.bodynamicformservice.formData.formid=null;
for (let i=0;i<this.bodynamicformservice.bodynamicformdetails.length;i++) {
this.bodynamicformservice.bodynamicformdetails[i].formdetailid=null;
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
this.bodynamicformForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodynamicformForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodynamicformForm.controls[key]!=undefined)this.bodynamicformForm.controls[key].disable({onlySelf: true});
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
tableidonChange(evt:any){
let e=evt.value;
}
tableiddesconChange(evt:any){
let e=evt.value;
}
conditionfieldonChange(evt:any){
let e=evt.value;
}
conditionvalueonChange(evt:any){
let e=evt.value;
}
formidonChange(evt:any){
let e=evt.value;
}
formnameonChange(evt:any){
let e=evt.value;
}
formtypeonChange(evt:any){
let e=this.f.formtype.value as any;
this.bodynamicformForm.patchValue({formtypedesc:evt.options[evt.options.selectedIndex].text});
}
formhtmlonChange(evt:any){
let e=evt.value;
}
colsonChange(evt:any){
let e=evt.value;
}
templatehtmlonChange(evt:any){
let e=evt.value;
}
hasattachmentsonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bodynamicformservice.getbodynamicformsByEID(pkcol).then(res => {

this.bodynamicformservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodynamicform.formid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodynamicform.formid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodynamicformForm.patchValue({
tableid: res.bodynamicform.tableid,
tableiddesc: res.bodynamicform.tableiddesc,
conditionfield: res.bodynamicform.conditionfield,
conditionvalue: res.bodynamicform.conditionvalue,
formid: res.bodynamicform.formid,
formname: res.bodynamicform.formname,
formtype: res.bodynamicform.formtype,
formtypedesc: res.bodynamicform.formtypedesc,
formhtml: res.bodynamicform.formhtml,
cols: res.bodynamicform.cols,
templatehtml: res.bodynamicform.templatehtml,
hasattachments: res.bodynamicform.hasattachments,
sequence: res.bodynamicform.sequence,
status: res.bodynamicform.status,
statusdesc: res.bodynamicform.statusdesc,
});
this.bodynamicformdetailsvisiblelist=res.bodynamicformdetailsvisiblelist;
//Child Tables if any
this.bodynamicformservice.bodynamicformdetails = res.bodynamicformdetails;
this.SetbodynamicformdetailsTableConfig();
this.bodynamicformdetailsLoadTable();
  setTimeout(() => {
  this.SetbodynamicformdetailsTableddConfig();
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
  for (let key in this.bodynamicformForm.controls) {
    if (this.bodynamicformForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodynamicformForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodynamicformForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodynamicformForm.value;
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
Object.keys(this.bodynamicformForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodynamicformForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodynamicformForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodynamicformservice.formData=this.bodynamicformForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodynamicformForm.controls[key] != null)
    {
        this.bodynamicformservice.formData[key] = this.bodynamicformForm.controls[key].value;
    }
}
}
}
this.bodynamicformservice.formData.DeletedbodynamicformdetailIDs = this.DeletedbodynamicformdetailIDs;
console.log(this.bodynamicformservice.formData);
this.bodynamicformservice.formData=this.bodynamicformForm.value;
this.bodynamicformservice.saveOrUpdatebodynamicforms().subscribe(
async res => {
if (this.bodynamicformdetailssource.data)
{
    for (let i = 0; i < this.bodynamicformdetailssource.data.length; i++)
    {
        if (this.bodynamicformdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bodynamicformdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodynamicform);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodynamicformservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodynamicform);
}
else
{
this.FillData(res);
}
}
this.bodynamicformForm.markAsUntouched();
this.bodynamicformForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittableid( tableid) {
/*let ScreenType='2';
this.dialog.open(systemtableComponent, 
{
data: {tableid:this.bodynamicformForm.get('tableid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbodynamicformdetail(event:any,formdetailid:any, formid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bodynamicformdetailComponent, 
{
data:  {  showview:this.showview,save:false,event,formdetailid, formid,visiblelist:this.bodynamicformdetailsvisiblelist,  hidelist:this.bodynamicformdetailshidelist,ScreenType:2  },
header: 'Form Details'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bodynamicformdetailssource.add(res);
this.bodynamicformdetailssource.refresh();
}
else
{
this.bodynamicformdetailssource.update(event.data, res);
}
}
});
}

onDeletebodynamicformdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbodynamicformdetailIDs += childID + ",";
this.bodynamicformservice.bodynamicformdetails.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bodynamicformdetails
bodynamicformdetailssettings:any;
bodynamicformdetailssource: any;

showbodynamicformdetailsCheckbox()
{
debugger;
if(this.tblbodynamicformdetailssource.settings['selectMode']== 'multi')this.tblbodynamicformdetailssource.settings['selectMode']= 'single';
else
this.tblbodynamicformdetailssource.settings['selectMode']= 'multi';
this.tblbodynamicformdetailssource.initGrid();
}
deletebodynamicformdetailsAll()
{
this.tblbodynamicformdetailssource.settings['selectMode'] = 'single';
}
showbodynamicformdetailsFilter()
{
  setTimeout(() => {
  this.SetbodynamicformdetailsTableddConfig();
  });
      if(this.tblbodynamicformdetailssource.settings!=null)this.tblbodynamicformdetailssource.settings['hideSubHeader'] =!this.tblbodynamicformdetailssource.settings['hideSubHeader'];
this.tblbodynamicformdetailssource.initGrid();
}
showbodynamicformdetailsInActive()
{
}
enablebodynamicformdetailsInActive()
{
}
async SetbodynamicformdetailsTableddConfig()
{
if(!this.bfilterPopulatebodynamicformdetails){
}
this.bfilterPopulatebodynamicformdetails=true;
}
async bodynamicformdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbodynamicformdetailsTableConfig()
{
this.bodynamicformdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
tableid: {
title: 'Table',
type: 'number',
filter:true,
},
tableiddesc: {
title: 'Table I D Desc',
type: '',
filter:true,
},
fieldname: {
title: 'Fieldname',
type: '',
filter:true,
},
controltype: {
title: 'Controltype',
type: '',
filter:true,
},
required: {
title: 'Required',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
fk: {
title: 'Fk',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
configurations: {
title: 'Configurations',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
bodynamicformdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodynamicformdetailsID)>=0)
{
this.bodynamicformdetailssource=new LocalDataSource();
this.bodynamicformdetailssource.load(this.bodynamicformservice.bodynamicformdetails as  any as LocalDataSource);
this.bodynamicformdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bodynamicformdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bodynamicformservice.bodynamicformdetails.length == 0)
{
    this.tblbodynamicformdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new bodynamicformdetail();
    this.bodynamicformservice.bodynamicformdetails.push(obj);
    this.bodynamicformdetailssource.refresh();
    if ((this.bodynamicformservice.bodynamicformdetails.length / this.bodynamicformdetailssource.getPaging().perPage).toFixed(0) + 1 != this.bodynamicformdetailssource.getPaging().page)
    {
        this.bodynamicformdetailssource.setPage((this.bodynamicformservice.bodynamicformdetails.length / this.bodynamicformdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbodynamicformdetailssource.grid.edit(this.tblbodynamicformdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bodynamicformdetailssource.data.indexOf(event.data);
this.onDeletebodynamicformdetail(event,event.data.formdetailid,((this.bodynamicformdetailssource.getPaging().page-1) *this.bodynamicformdetailssource.getPaging().perPage)+index);
this.bodynamicformdetailssource.refresh();
break;
}
}

*/
bodynamicformdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbodynamicformdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbodynamicformdetail(event,event.data.formdetailid,this.formid);
break;
case 'delete':
this.onDeletebodynamicformdetail(event,event.data.formdetailid,((this.bodynamicformdetailssource.getPaging().page-1) *this.bodynamicformdetailssource.getPaging().perPage)+event.index);
this.bodynamicformdetailssource.refresh();
break;
}
}
bodynamicformdetailsonDelete(obj) {
let formdetailid=obj.data.formdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.bodynamicformservice.deletebodynamicform(formdetailid).then(res=>
this.bodynamicformdetailsLoadTable()
);
}
}
bodynamicformdetailsPaging(val)
{
debugger;
this.bodynamicformdetailssource.setPaging(1, val, true);
}

handlebodynamicformdetailsGridSelected(event:any) {
this.bodynamicformdetailsselectedindex=this.bodynamicformservice.bodynamicformdetails.findIndex(i => i.formdetailid === event.data.formdetailid);
}

  async bodynamicformdetailsmoveUp() {
    this.bodynamicformdetailsmove(-1);
  }

  async bodynamicformdetailsmove(val) {
    let index=((this.bodynamicformdetailssource.getPaging().page - 1) * this.bodynamicformdetailssource.getPaging().perPage) + this.bodynamicformdetailsselectedindex;
    if (index >= 0) {
      
      var current = this.bodynamicformservice.bodynamicformdetails[index];
      var tmp = this.bodynamicformservice.bodynamicformdetails[index +val];
      this.bodynamicformservice.bodynamicformdetails[index +val] = this.bodynamicformservice.bodynamicformdetails[index];
      this.bodynamicformservice.bodynamicformdetails[index] = tmp;
      this.bodynamicformservice.bodynamicformdetails[index +val].sequence=index +val;
      this.bodynamicformservice.bodynamicformdetails[index].sequence=index;
      this.bodynamicformdetailssource.refresh();
      this.bodynamicformdetailsselectedindex=this.bodynamicformservice.bodynamicformdetails.findIndex(i => i.formdetailid === current.formdetailid);
      this.tblbodynamicformdetailssource.grid.getRows().forEach((row:any) => {
        if( current.formdetailid == row.data.formdetailid) {
          this.tblbodynamicformdetailssource.grid.selectRow(row);
          
        }
      });
    }
  }

  bodynamicformdetailsmoveDown() {
    return this.bodynamicformdetailsmove(1);
  }
IsbodynamicformdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodynamicformdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bodynamicformdetails

}



