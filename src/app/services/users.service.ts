import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core"
import { catchError, delay, Observable, of, throwError } from "rxjs";

import { User } from "../models/user.model";
import { Repository } from "../models/repository.model";
import { environment } from '../../environments/environment.development';


@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly env = environment;
    readonly http = inject(HttpClient);

    getFirstPageUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.env.apiBaseUrl}?page=0&per_page=10`)
            .pipe(
                catchError(error => this.handleError(error)),
            );
    }

    getUsersSince(since: number): Observable<User[]> {
        return this.http.get<User[]>(`${this.env.apiBaseUrl}?since=${since}&per_page=10`)
            .pipe(
                catchError(error => this.handleError(error)),
            )
    }

    getUserDetails(id: number): Observable<User> {
        return this.http.get<User>(`${this.env.apiBaseUrl}/${id}`)
            .pipe(
                catchError(error => this.handleError(error)),
            )
    }

    getUserRepositories(username: string): Observable<Repository[]> {
        return this.http.get<any[]>(`${this.env.apiBaseUrl}/${username}/repos`)
    }

    private handleError(err: HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
            console.warn('Client error ', err.message);
        } else {
            console.warn('Server error ', err.status);
        }
        return throwError(() => new Error(err.message));
    }

}