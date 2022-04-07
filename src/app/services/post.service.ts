import { Post } from './../interfaces/post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPost() {
    return this.http.get(`${apiUrl}/posts`);
  }
  createPost(post: Post[]) {
    return this.http
      .post(`${apiUrl}/posts`, post)
      .pipe(catchError(this.handleError));
  }
  updatePost(post: Post[], id: number) {
    return this.http
      .put(`${apiUrl}/posts/${id}`, post)
      .pipe(catchError(this.handleError));
  }
  deletePost(id: Post) {
    return this.http
      .delete(`${apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.log('caught mapping error and rethrowing', err);
    return throwError(() => Error(`${err}`));
  }
}
