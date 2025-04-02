import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { AsyncPipe } from '@angular/common';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-user-details',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  route = inject(ActivatedRoute);
  usersService = inject(UsersService);

  userLogin!: string;
  userType!: string;
  userRepositories$!: Observable<Repository[]>;

  routeSubscription = new Subscription();

  ngOnInit(): void {
    this.getUserRepositories();
  }

  getUserRepositories() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.userLogin = params['username'];
      this.userType = params['type'];
      this.userRepositories$ = this.usersService.getUserRepositories(params['username']);
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
