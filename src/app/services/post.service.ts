import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webApiEndPoints } from '../constants/webapi-endpoints';
import {Observable} from 'rxjs';
// import 'rxjs/operator/map';

@Injectable()
export class PostService {

    constructor(private http: HttpClient) { }

    getPosts(): Observable<any> {
        return this.http.get(webApiEndPoints.posts);
    }

}
