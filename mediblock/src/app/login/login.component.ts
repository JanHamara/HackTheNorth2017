import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  login() {
    document.getElementById('login-form').style.display = 'none';
  }
}
