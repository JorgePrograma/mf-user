import { Injectable, signal } from '@angular/core';
import { GroupModel } from '../../model/group.model';
import { GROUPS_MOCK } from '../../mocks/groupsMock';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupSignal = signal<GroupModel[]>(GROUPS_MOCK);

 /**
  * Obtiene todos los tipos de documentos.
  */
 getGroups(): GroupModel[] {
   return this.groupSignal();
 }
}
