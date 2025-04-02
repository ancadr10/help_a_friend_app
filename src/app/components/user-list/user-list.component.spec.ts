import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

const mockUserList: User[] = [
  { id: 1, login: 'user_1', avatar_url: 'avatar_user_1_url', type: 'User' },
  { id: 2, login: 'user_2', avatar_url: 'avatar_user_2_url', type: 'User' }
];

const newMockUsers: User[] = [
  { id: 3, login: 'user_3', avatar_url: 'avatar_user_3_url', type: 'User' },
  { id: 4, login: 'user_4', avatar_url: 'avatar_user_4_url', type: 'User' }
];

fdescribe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {

    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getFirstPageUsers', 'getUsersSince']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get first page users on init', () => {
    usersServiceSpy.getFirstPageUsers.and.returnValue(of(mockUserList));

    fixture.detectChanges();

    expect(usersServiceSpy.getFirstPageUsers).toHaveBeenCalled();
    expect(component.userList).toEqual(mockUserList);
  });

  it('should load more users when loadUsers is called', fakeAsync(() => {
    component.userList = [...mockUserList];
    usersServiceSpy.getFirstPageUsers.and.returnValue(of(mockUserList));
    fixture.detectChanges();

    usersServiceSpy.getUsersSince.and.returnValue(of(newMockUsers));

    component.loadUsers();

    tick();
    fixture.detectChanges();

    expect(usersServiceSpy.getFirstPageUsers).toHaveBeenCalled();
    expect(usersServiceSpy.getUsersSince).toHaveBeenCalledWith(2);
    expect(component.userList.length).toBe(4);
    expect(component.userList).toEqual([...mockUserList, ...newMockUsers]);
  }));

  it('should not call getUsersSince if userList is empty', () => {
    usersServiceSpy.getFirstPageUsers.and.returnValue(of([]));
    fixture.detectChanges();

    component.userList = [];
    component.loadUsers();

    expect(usersServiceSpy.getUsersSince).not.toHaveBeenCalled();
  });

});
