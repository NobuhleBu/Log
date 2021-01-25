import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsServicesService } from '../services/incidents-services.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { UpdateConfirmDialogComponent } from '../update-confirm-dialog/update-confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-incident-edit',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit
{

  updateForm: FormGroup = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    password : new FormControl(''),
    role: new FormControl('')
  });
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

    this.getUser(2);
  }

  // tslint:disable-next-line: typedef
  getUser(id: number= 2)
  {
    this.incidentService.getUsers(2).subscribe(data => {
      this.updateForm.controls.UserId.setValue(2);
      this.updateForm.controls.firstname.setValue(data.FirstName);
      this.updateForm.controls.lastname.setValue(data.LastName);
      this.updateForm.controls.email.setValue(data.EmailAddress);
      this.updateForm.controls.contact.setValue(data.CellNumber);
      this.updateForm.controls.password.setValue(data.password);
      this.updateForm.controls.role.setValue(data.role);
      console.log(data);
    });
  }

  // tslint:disable-next-line: typedef
  onFormSubmit(form: FormGroup)
  {

    // console.log(form.value);
    // this.isLoadingResults = true;


    /*this.incidentService.updateUser(form.value.User_ID, form.value)
    .subscribe(res => {
      this.isLoadingResults = false;
      alert('Success');
      // this.router.navigate(['/home']);
    }, (err) =>
    {
      console.log(err);
      this.isLoadingResults = false;
    });*/
      // if (form.valid) {
      //   return;
      // }
     // this.getUser(this.avRoute.snapshot.params.id);

     // this.isLoadingResults = true;

      alert('Success user ' + this.getUser(2));
      this.incidentService.updateUser(form.value.UserId, form.value)
      .subscribe(res => {
        alert('Success');
        this.router.navigate(['/home']);
      }, (err) =>
      {
        console.log(err);
      });
  }


  // tslint:disable-next-line: typedef
  UserDetails(){
    // this.router.navigate(['/view', this.incident_ID]);
  }
  // tslint:disable-next-line: typedef


// tslint:disable-next-line: typedef
openDialog(){
  const dialogRef = this.dialog.open(UpdateConfirmDialogComponent, {
    width: '350px',
  });
}


}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


