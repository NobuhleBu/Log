import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';  
import { Router, ActivatedRoute } from '@angular/router';  
import { Observable } from 'rxjs';
import {IncidentsServicesService} from '../services/incidents-services.service'


import {IncidentsLogged} from '../models/incidentsLogged'
//import { Incidents } from 'src/models/incidents';
//import { IncidentsService } from '../../services/inciservices.services' ;


@Component({ templateUrl: 'view.component.html' })
export class ViewComponent implements OnInit
{
  incidents: any;

  constructor(
    private incidentsService: IncidentsServicesService,
    private router: Router){}

  ngOnInit() {
      this.loadIncidents();
  }

  loadIncidents() {
    this.incidentsService.getIncidents().subscribe( data => {
      console.log(data);
      this.incidents = data;
    });
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/incident-edit', {id: id}]);
  }
    

    //public inciList: Incidents[] = [];
    
    // constructor(public http: Http, private _router: Router, private _inciService: IncidentsService) {  
    //     this.getIncidents();  
    // }  

    // getIncidents() {  
    //     this._inciService.getIncidents().subscribe(  )
             
    // }  



}




