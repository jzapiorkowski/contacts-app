import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public isLoggedIn: boolean = false;

  public ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
