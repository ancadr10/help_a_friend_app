import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Repository } from '../../models/repository.model';

fdescribe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const mockActivatedRoute = {
    queryParams: of({ username: 'testuser', type: 'User' })
  };

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUserRepositories']);

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UsersService, useValue: usersServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user repositories based on route params', () => {
    const mockRepositories: Repository[] = [{ id: 1, name: 'repo1', html_url: 'repo1_url' }, { id: 2, name: 'repo2', html_url: 'repo2_url' }];
    usersServiceSpy.getUserRepositories.and.returnValue(of(mockRepositories));

    fixture.detectChanges();

    expect(component.userLogin).toBe('testuser');
    expect(component.userType).toBe('User');
    expect(usersServiceSpy.getUserRepositories).toHaveBeenCalledWith('testuser');

    component.userRepositories$.subscribe(repos => {
      expect(repos).toEqual(mockRepositories);
    });
  });
});