import { Component, DestroyRef, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { User } from '../../dto/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-search-recipe',
    imports: [
        FormsModule,
        Select
    ],
    templateUrl: './search-recipe.html',
    styleUrl: './search-recipe.scss',
})
export class SearchRecipe implements OnInit {

    @Input() hideOverlay$ = new Subject<void>();
    @Input() searchUser$ = new Subject<void>;
    @Output() searchRecipes$ = new Subject<string>();
    search: string;

    users: User[] = [];

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef
    ) {
    }

    ngOnInit() {
        this.searchUser$
            .subscribe(() => {
                this.userService.searchUser(this.search)
                    .subscribe(users => {
                        this.showOverlayContent();
                        this.users = users.map(user => ({
                            ...user,
                            displayName: `${ user.firstName } ${ user.lastName }`
                        }));
                    });
            });

        this.hideOverlay$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.hideOverlayContent());
    }

    onSearchChange() {
        this.searchRecipes$.next(this.search);
    }

    clearSearch() {
        this.search = null;
        this.searchRecipes$.next(null);
        this.hideOverlayContent();
    }

    viewUserProfile(value: SelectChangeEvent) {
        const user = value as unknown as User;
        if (user && user.id) {
            this.router.navigate(['/', 'user', 'user-profile', user.id]);
        }
    }

    private showOverlayContent() {
        const overlayContent = (document.querySelector('.ng-trigger-overlayContentAnimation') as HTMLElement);
        if (overlayContent) {
            overlayContent.style.visibility = 'visible';
        }
    }

    private hideOverlayContent() {
        const overlayContent = (document.querySelector('.ng-trigger-overlayContentAnimation') as HTMLElement);
        if (overlayContent) {
            overlayContent.style.visibility = 'hidden';
        }
    }
}
