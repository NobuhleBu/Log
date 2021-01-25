import { UpdateConfirmDialogComponent } from './update-confirm-dialog/update-confirm-dialog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewComponent } from './view/view.component';
import {IncidentEditComponent} from './incident-edit/incident-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: UpdateProfileComponent},
  { path: 'log', component: LogComponent},
  { path: 'view', component: ViewComponent},
  {path: 'incident-edit', component: IncidentEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
