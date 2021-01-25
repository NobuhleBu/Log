import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ViewComponent } from '../view/view.component';
import {UpdateConfirmDialogComponent } from '../update-confirm-dialog/update-confirm-dialog.component';
import { Incident, IncidentsLogged, Users } from 'src/app/main/models/incidentsLogged';


@Injectable({
  providedIn: 'root'
})
export class IncidentsServicesService {
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/User_Account';

  }
  dialog: any;

  myAppUrl: string;
  myApiUrl: string;


  httpOptions =
  {
    headers: new HttpHeaders({    'Content-Type': 'application/json; charset=utf-8'
    })
  };
  // tslint:disable-next-line: typedef
  onSubmit(userUpdate: any) {
    throw new Error('Method not implemented.');
  }

  getIncidents(): Observable<IncidentsLogged[]>
  {
      return this.http.get<Incident[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

//   getIncident(incidentId: number): Observable<Incident> {
//     return this.http.get<Incident>(this.myAppUrl + this.myApiUrl  + incidentId)
//     .pipe(
//       retry(1),
//       catchError(this.errorHandler)
//     );
// }
getIncident(id: number): Observable<Incident> {
    const url = `${this.myApiUrl}/${id}`;
    return this.http.get<Incident>(this.myAppUrl + this.myApiUrl + '/'  + id)
      .pipe(
        tap(_ => console.log(`fetched Incident id=${id}`)),
        // catchError(this.errorHandler<Incident>(`getIncident id=${id}`))
        // retry(1),
        catchError(this.errorHandler)
      );
  }
  getUsers(id: number = 2): Observable<Users> {
    const url = `${this.myApiUrl}/${id}`;
    return this.http.get<Users>(this.myAppUrl + this.myApiUrl + '/'  + id)
      .pipe(
        tap(_ => console.log(`fetched User id=${id}`)),
        // catchError(this.errorHandler<Incident>(`getIncident id=${id}`))
        // retry(1),
        catchError(this.errorHandler)
      );
  }

// saveIncident(incidents: Incident): Observable<Incident> {
//   return this.http.post<Incident>(this.myAppUrl + this.myApiUrl, JSON.stringify(incidents))
//   .pipe(
//     retry(1),
//     catchError(this.errorHandler)
//   );
// }

saveIncident(incident: Incident): Observable<Incident> {
  return this.http.post<Incident>(this.myApiUrl, JSON.stringify(incident), this.httpOptions).pipe(
    tap((incidents: Incident) => console.log(`added Incident w/ id=${incidents.incident_ID}`))
  );
}

saveUser(User: Users): Observable<Users> {
  return this.http.post<Users>(this.myApiUrl, JSON.stringify(User), this.httpOptions).pipe(
    // tslint:disable-next-line: variable-name
    tap((_Users: Users) => console.log(`added Incident w/ id=${User.UserId}`))
  );
}

// updateIncident(incident_ID: number, incident: any): Observable<Incident> {
//   return this.http.put<Incident>(this.myAppUrl + this.myApiUrl + incident_ID, JSON.stringify(incident), this.httpOptions)
//   .pipe(
//     retry(1),
//     catchError(this.errorHandler)
//   );
// }
updateIncident(id: number, incident: Incident): Observable<Incident> {
  // const url = `${this.myApiUrl}/${id}`;
  return this.http.put<Incident>(this.myAppUrl + this.myApiUrl + '/' + id, JSON.stringify(incident), this.httpOptions)
  .pipe(
    tap(next => {
      console.log('Incident that got updated: ' + id);
    }),
    retry(1),
    catchError(this.errorHandler)
  );
}

updateUser(id: number = 2, incident: Users): Observable<Users> {
  // const url = `${this.myApiUrl}/${id}`;
  return this.http.put<Users>(this.myAppUrl + this.myApiUrl + '/' + id, JSON.stringify(incident), this.httpOptions)
  .pipe(
    tap(next => {
      console.log('User that got updated: ' + id);
    }),
    retry(1),
    catchError(this.errorHandler)
  );
}


  // tslint:disable-next-line: typedef
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




}
