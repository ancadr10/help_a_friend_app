import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { UsersService } from "./users.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Repository } from "../models/repository.model";

const mockUser: User = {
    id: 1,
    login: 'user_1',
    avatar_url: 'avatar_user_1_url',
    type: 'User'
};

const mockRepo: Repository = {
    id: 1001,
    name: "Test Repo",
    html_url: "https://github.com/user_1/test-repo",
};

fdescribe('UsersService', () => {
    let service: UsersService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        httpTesting = TestBed.inject(HttpTestingController);
        service = TestBed.inject(UsersService);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get first page users', () => {
        let users: User[] = [];
        service.getFirstPageUsers().subscribe((response) => {
            users = response;
        });

        const req = httpTesting.expectOne('https://api.github.com/users?page=0&per_page=10');
        req.flush([mockUser]);

        expect(req.request.method).toBe('GET');
        expect(users).toEqual([mockUser]);
        expect(users[0].id).toBe(mockUser.id);
    });

    it('should get users since a specific ID', () => {
        let users: User[] = [];
        service.getUsersSince(1).subscribe((response) => {
            users = response;
        });

        const req = httpTesting.expectOne('https://api.github.com/users?since=1&per_page=10');
        expect(req.request.method).toBe('GET');
        req.flush([mockUser]);

        expect(users).toEqual([mockUser]);
    });

    it('should get user details by ID', () => {
        let user: User | undefined;
        service.getUserDetails(1).subscribe((response) => {
            user = response;
        });

        const req = httpTesting.expectOne('https://api.github.com/users/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);

        expect(user).toEqual(mockUser);
    });

    it('should get user repositories', () => {
        let repos: Repository[] = [];
        service.getUserRepositories("user_1").subscribe((response) => {
            repos = response;
        });

        const req = httpTesting.expectOne('https://api.github.com/users/user_1/repos');
        expect(req.request.method).toBe('GET');
        req.flush([mockRepo]);

        expect(repos).toEqual([mockRepo]);
    });

});