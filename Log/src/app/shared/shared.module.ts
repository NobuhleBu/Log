import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileMenuComponent } from './header-profile-menu/header-profile-menu.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, HeaderProfileMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [ HeaderComponent, SideNavComponent, HeaderProfileMenuComponent ]
})
export class SharedModule { }