import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CreateUserRequestDto, SignInDto } from '@contacts-app/libs';
import { Subject, takeUntil } from 'rxjs';

interface RegisterForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  public form: FormGroup<RegisterForm> = new FormGroup<RegisterForm>({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public isLoginPage!: boolean;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.isLoginPage = this.router.url === '/auth/login';
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const userDto: SignInDto | CreateUserRequestDto = {
      username: this.form.value.username!,
      password: this.form.value.password!,
    };

    switch (this.router.url) {
      case '/auth/login':
        this.authService
          .login(userDto)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => this.router.navigate(['/']));
        return;
      case '/auth/register':
        this.userService
          .register(userDto)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => this.router.navigate(['/auth/login']));
        return;
      default:
        this.toastr.error('Something went wrong');
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
