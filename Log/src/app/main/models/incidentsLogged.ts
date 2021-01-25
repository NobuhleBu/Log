export class IncidentsLogged {
  // tslint:disable-next-line: variable-name
  incident_ID?: number ;
  // tslint:disable-next-line: variable-name
  incident_Location: string =  '';
  // tslint:disable-next-line: variable-name
  incident_Description: string = '';
    // body: string;
  // tslint:disable-next-line: variable-name
  incident_Date_Logged?: Date;
  // tslint:disable-next-line: variable-name
  incident_Status?: number;
  // tslint:disable-next-line: variable-name
  incident_User_ID?: number;
  // tslint:disable-next-line: variable-name
  incident_Technician_ID?: number;
  }

export interface Incident {
  incident_ID: number;
  incident_Location: string;
  incident_Description: string;
    // body: string;
  incident_Date_Logged: Date;
  incident_Status: number;
  incident_User_ID: number;
 // incident_Technician_ID?:any
}

export interface Users {
  UserId: number;
  LastName: string;
  FirstName: string;
  EmailAddress: string;
  CellNumber: number;
  password: string;
  role: string;

}
