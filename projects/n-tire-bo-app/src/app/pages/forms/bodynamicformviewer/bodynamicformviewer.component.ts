import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bodynamicformService } from '../../../../../../n-tire-bo-app/src/app/service/bodynamicform.service';
import { bodynamicform } from '../../../../../../n-tire-bo-app/src/app/model/bodynamicform.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bodynamicformviewer-app',
  templateUrl: './bodynamicformviewer.component.html'

})
export class bodynamicformviewerComponent {
  public form: FormGroup;
  unsubcribe: any
  public fields: any[] = [];
  FormName: any;
  FormHtml: any;

  public fields1: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },

    {
      type: 'file',
      name: 'picture',
      label: 'Picture',
      required: true,
      onUpload: this.onUpload.bind(this)
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'in', label: 'India' },
        { key: 'us', label: 'USA' }
      ]
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ]
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      required: true,
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' }
      ]
    }
  ];


  constructor(
    private currentRoute: ActivatedRoute,
    private bodynamicformservice: bodynamicformService
  ) {
    let bodynamicform = this.currentRoute.snapshot.paramMap.get('id');
    this.bodynamicformservice.getbodynamicformsByID(parseInt(bodynamicform)).then((res:any) => {
      console.log(res);
      debugger;
      this.FormName = res.bodynamicform.formname;
      this.FormHtml = res.bodynamicform.formhtml;
      let dynamicfields = res.bodynamicformdetail;

      for (let j = 0; j < dynamicfields.length; j++) {

        let fld = dynamicfields[j];
        let fld_required = false;
        if (fld.required == true) fld_required = true;
        let type = 'text';
        if (fld.controltype == "C") type = "checkbox";
        if (fld.controltype == "R") type = "radio";
        if (fld.controltype == "D") type = "dropdown";

        let ddlist: any[] = [];
        let lines: string[];
        if (fld.controltype == "D" || fld.controltype == "R") {
          lines = fld.configurations.split(',');
          for (let i = 0; i < lines.length; i++) {
            let Texts: string[];
            Texts = lines[i].split(':');
            ddlist.push({ key: Texts[0], label: Texts[1] });
          }
        }
        debugger;
        if (fld.controltype == "D") {
          this.fields.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, options: ddlist });
        }
        else if (fld.controltype == "C") {
          ddlist.push({ key: fld.fieldname, label: fld.fieldname });
          this.fields.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, options: ddlist });
        }
        else if (fld.controltype == "R") {
          this.fields.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, options: ddlist });
        }
        else if (fld.controltype == "M") {
          this.fields.push({ type: 'text', name: fld.fieldname, label: fld.fieldname, value: '', required: fld_required, multiline: true });
        }
        else {
          this.fields.push({ type: type, multiline: false, name: fld.fieldname, label: fld.fieldname, value: '', required: fld_required, });
        }
      }

      console.log(JSON.stringify(this.fields));
      console.log(JSON.stringify(this.fields1));
      // console.log(new FormControl(JSON.stringify(this.fields)));
      // console.log(new FormControl(JSON.stringify(this.fields1)));

      this.form = new FormGroup({
        fields: new FormControl(JSON.stringify(this.fields))
      });


      for (let j = 0; j < dynamicfields.length; j++) {

        let fld = dynamicfields[j];
        let fld_required = false;
        if (fld.required == true) fld_required = true;
        debugger;
        if (fld_required)
          this.form.controls[fld.fieldname].setValidators([Validators.required]);
        else
          this.form.controls[fld.fieldname].clearValidators();
        this.form.controls[fld.fieldname].updateValueAndValidity();
      }
      this.unsubcribe = this.form.valueChanges.subscribe((update) => {
        console.log(update);
        this.fields = JSON.parse(update.fields);
      });

    });


  }

  onUpload(e:any) {
    console.log(e);

  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }
}
