import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserItemComponent } from '../user-item/user-item.component';
import { User } from '../../models/user.model';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'user-list',
  imports: [
    UserItemComponent,
    LazyLoadDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  usersService = inject(UsersService);
  destroyRef = inject(DestroyRef);

  userList: User[] = [];

  ngOnInit() {
    this.getFirstPageUsers();
  }

  getFirstPageUsers() {
    this.usersService.getFirstPageUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: User[]) => this.userList = data,
        error: (err) => console.log(err)
      });
  }

  loadUsers() {
    if (!this.userList.length) {
      return;
    }

    const lastUserId = this.userList[this.userList.length - 1].id;

    this.usersService.getUsersSince(lastUserId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: User[]) => {
          this.userList = [...this.userList, ...data];
        },
        error: (err) => console.log(err)
      });
  }

}
