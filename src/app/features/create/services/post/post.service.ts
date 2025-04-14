import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { PostModel } from '../../model/post.model';
import { POSTS_MOCK } from '../../mocks/postsMock';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() {}
 // Signal para manejar el estado reactivo de los tipos de documentos
 postSignal = signal<PostModel[]>(POSTS_MOCK);

 /**
  * Obtiene todos los tipos de documentos.
  */
 getPosts(): PostModel[] {
   return this.postSignal();
 }
}
