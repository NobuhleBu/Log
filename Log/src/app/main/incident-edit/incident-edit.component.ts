import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsServicesService } from '../services/incidents-services.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-incident-edit',
  templateUrl: './incident-edit.component.html',
  styleUrls: ['./incident-edit.component.css']
})
export class IncidentEditComponent implements OnInit {

  updateForm: FormGroup = new FormGroup({
    incident_ID: new FormControl('', [Validators.required]),
    incident_Date_Logged: new FormControl(''),
    incident_Description: new FormControl(''),
    incident_Location: new FormControl(''),
    incident_Status: new FormControl(''),
    // incident_Technician_ID: new FormControl(''),
    incident_User_ID: new FormControl('')
  });

  // form: FormGroup;
  // incident_ID!: number;
  // incident_Date_Logged = '';
  // incident_Description = '';
  // incident_Location ='';
  // incident_Status = '';
  // incident_Technician_ID = '';
  homePage = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialog: MatDialog,
    public matProgres: MatProgressSpinnerModule,
    public formField: MatFormFieldModule,
    public matCard: MatCardModule,
    private incidentService: IncidentsServicesService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void
  {
    this.getIncident(this.avRoute.snapshot.params.id);
    // this.form = this.formBuilder.group({
    //   'incident_Description' : [null, Validators.required]
    // });

  }

  // tslint:disable-next-line: typedef
  getIncident(id: number)
  {
    this.incidentService.getIncident(id).subscribe(data => {
      this.updateForm.controls.incident_ID.setValue(data.incident_ID);
      this.updateForm.controls.incident_Location.setValue(data.incident_Location);
      this.updateForm.controls.incident_Description.setValue(data.incident_Description);
      this.updateForm.controls.incident_Date_Logged.setValue(data.incident_Date_Logged);
      this.updateForm.controls.incident_Status.setValue(data.incident_Status);
      // this.updateForm.controls.incident_Technician_ID.setValue(data.incident_Technician_ID);
      this.updateForm.controls.incident_User_ID.setValue(data.incident_User_ID);
    });
  }

  // tslint:disable-next-line: typedef
  onFormSubmit(form: FormGroup)
  {
    console.log(form.value);

    this.isLoadingResults = true;

    // form.controls.incident_Description.setValue('Broken chair');

    this.incidentService.updateIncident(form.value.incident_ID, form.value)
    .subscribe(res => {
      this.isLoadingResults = false;
      alert('Success');
      // this.router.navigate(['/home']);
    }, (err) =>
    {
      console.log(err);
      this.isLoadingResults = false;
    });
  }



  // tslint:disable-next-line: typedef
  incidentDetails(){
    // this.router.navigate(['/view', this.incident_ID]);
  }



}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
