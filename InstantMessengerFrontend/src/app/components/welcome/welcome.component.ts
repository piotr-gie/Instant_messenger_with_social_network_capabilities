import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isRegisterFormOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleRegisterForm() {
    this.isRegisterFormOpen = !this.isRegisterFormOpen;
  }

}
