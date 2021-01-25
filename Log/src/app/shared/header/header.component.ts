import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() profileMenu = false;
  @Output() profileMenuOutput = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleProfileMenu(): void {
    this.profileMenu = !this.profileMenu;
    this.profileMenuOutput.emit(this.profileMenu);
  }

}
