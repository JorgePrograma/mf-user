import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ResponseModel } from '../../model/response.model';
import { BranchModel } from '../../model/branch.model';
import { BRANCH_MOCK } from '../../mocks/branchMock';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor() {}
 // Signal para manejar el estado reactivo de los tipos de documentos
 branchSignal = signal<BranchModel[]>(BRANCH_MOCK);

 /**
  * Obtiene todos los tipos de documentos.
  */
 getDocumentTypes(): BranchModel[] {
   return this.branchSignal();
 }
}
