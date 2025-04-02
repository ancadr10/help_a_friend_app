import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserItemComponent } from './user-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

const mockUser: User = {
    id: 1,
    login: 'testuser',
    avatar_url: 'avatar_url',
    type: 'User'
};

fdescribe('UserItemComponent', () => {
    let component: UserItemComponent;
    let fixture: ComponentFixture<UserItemComponent>;

    const mockActivatedRoute = {
        queryParams: of({ username: 'testuser', type: 'User' })
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserItemComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserItemComponent);

        fixture.componentRef.setInput('user', mockUser);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });


})
