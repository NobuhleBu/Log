import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {IncidentsServicesService} from '../services/incidents-services.service'
import {Incident, IncidentsLogged} from '../models/incidentsLogged'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'


@Component({ templateUrl: 'log.component.html' })


export class LogComponent implements OnInit{
 
  actionType!: string;
  formincident_Description: string;
  formincident_Location: string;
  formincident_ID: any;
  formincident_Status: any;
  formincident_User_Id: any;
  //formincident_Tech_Id: any;
 // formincident_Date_Loged: Date;
  errorMessage: any;
  existingLogged!: IncidentsLogged;
  homePage = '';
  isLoadingResults = false;

  form =new FormGroup({
    'incident_Description' : new FormControl('',[ Validators.required]),
    'incident_Location' : new FormControl('', [Validators.required]),
    'incident_Date_Logged' : new FormControl([Date.now, null]),
    'incident_Status' : new FormControl(0),
    'incident_User_ID' : new FormControl(105),
    //'incident_Technician_ID' : new FormControl(110)
  });

    matcher = new MyErrorStateMatcher();
    constructor(public dialog: MatDialog, public matProgres: MatProgressSpinnerModule, public formField: MatFormFieldModule, public matCard: MatCardModule, private incidentService: IncidentsServicesService, private  formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router){
        const idParam = 'id';
        this.actionType = 'Add';
        this.formincident_ID ='incident_ID';
        this.formincident_Description = 'incident_Description';
        this.formincident_Location = 'incident_Location';
        this.formincident_Status = 'incidet_status';
        this.formincident_User_Id = 'incident_user';
        //this.formincident_Tech_Id = 'incident_tech';
        if (this.avRoute.snapshot.params[idParam]) {
          this.formincident_ID = this.avRoute.snapshot.params[idParam];
        }

        // this.form = this.formBuilder.group(
        //   {
        //     incident_ID: 0,
        //     incident_Description: ['', [Validators.required]],
        //     incident_Location: ['', [Validators.required]],
        //   }
        // )

    }
    ngOnInit() {
      


      // this.incidentService.saveIncident(this.form.value).subscribe(data => {
      //   this.form.controls.incident_ID.setValue(data.incident_ID);
      //   this.form.controls.incident_Location.setValue(data.incident_Location);
      //   this.form.controls.incident_Description.setValue(data.incident_Description);
      //   this.form.controls.incident_Date_Logged.setValue(data.incident_Date_Logged);
      //   this.form.controls.incident_Status.setValue(data.incident_Status);
      //   this.form.controls.incident_Technician_ID.setValue(data.incident_Technician_ID);
      //   this.form.controls.incident_User_ID.setValue(data.incident_User_ID);
      // });
    }
      
    save() {
      if (!this.form.valid) {
        
        return;
      }
      let incidentsLogged: Incident=
      {
        incident_ID:0,
        incident_Description: this.form.controls.incident_Description.value,
        incident_Location: this.form.controls.incident_Location.value,
        incident_Date_Logged: new Date(),
        incident_Status: 0,
        incident_User_ID: 105,
        //incident_Technician_ID: 110
      };

      this.incidentService.saveIncident(incidentsLogged)
      .subscribe((data) => {
        alert('Success');
      });
      this.form.reset();
      // // if (this.actionType === 'Add') {
      // //   let incLogged: IncidentsLogged = {
      // //     incident_ID: this.form.get(this.formincidentId)!.value,
      // //     incident_Date_Logged: new Date(),
      // //     incident_Description: this.form.get(this.formDesrption)?.value ,
      // //     incident_Location: this.form.get(this.formLocation)?.value,
      // //     incident_Status: 0,
      // //     incident_User_ID: 105,
      // //     incident_Technician_ID: 110
      // //   };

      // //   this.incidentService.saveIncident(incLogged)
      // //     .subscribe((data) => {
      // //       this.router.navigate(['/log', data.incident_ID]);
      // //     });
      // // }

      // if (this.actionType === 'Edit') {
      //   let incLogged: IncidentsLogged = {
      //     incidentId: this.existingLogged.incidentId,
      //     incidentDateLogged: this.existingLogged?.incidentDateLogged,
      //     incidentDescription: this.form.get(this.formDesrption).value,
      //     incidentLocation: this.form.get(this.formBody).value
      //   };

      //   // this.incidentService.updateBlogPost(blogPost.postId, blogPost)
      //   //   .subscribe((data) => {
      //   //     this.router.navigate([this.router.url]);
      //   //   });
      // }
    }

    cancel() {
      this.router.navigate(['/']);
    }
    // get description(){return this.form.get(this.formDesrption);}
    // get loction(){return this.form.get(this.formLocation);}

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: "Click confirm to log your incident"
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            console.log('Yes clicked');
            // DO SOMETHING
          }
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