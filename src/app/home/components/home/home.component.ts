import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    isLoggedInSubscription: Subscription | undefined;
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() : void {
        this.authService.isLogged$.subscribe(isLoggedIn => {
            if(isLoggedIn) {
                this.router.navigateByUrl('/boards');
            }
        })
    }

    ngOnDestroy(): void {
        this.isLoggedInSubscription?.unsubscribe();
    }
}