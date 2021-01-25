import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-profile-menu',
  templateUrl: './header-profile-menu.component.html',
  styleUrls: ['./header-profile-menu.component.css']
})
export class HeaderProfileMenuComponent implements OnInit {

  @Output() menuClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  menuClicked() {
    this.menuClick.emit(false);
  }


}
