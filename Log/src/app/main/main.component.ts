import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  profileMenu = false;

  constructor() {}

  ngOnInit(): void {
  }

  toggleProfileMenu(bool: boolean): void {
    this.profileMenu = bool;
  }

  menuClicked(): void {
    this.profileMenu = false;
  }
}
