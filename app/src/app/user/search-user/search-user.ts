import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Select, SelectChangeEvent } from 'primeng/select';
import { User } from '../../dto/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-user',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        Select
    ],
    templateUrl: './search-user.html',
    styleUrl: './search-user.scss'
})
export class SearchUser {

    search: string;

    users: User[] = [];

    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {
    }

    searchUser() {
        this.userService.searchUser(this.search)
            .subscribe(users => {
                this.users = users.map(user => ({
                    ...user,
                    displayName: `${ user.firstName } ${ user.lastName }`
                }));
            });
    }

    viewUserProfile(value: SelectChangeEvent) {
        const user = value as unknown as User;
        if (user && user.id) {
            this.router.navigate(['/', 'user', 'user-profile', user.id]);
        }
    }
}
