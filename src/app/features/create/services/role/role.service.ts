import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Role } from '../../model/role.model';
import { RolesMock } from '../../mocks/rolesMock';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor() {}

  /**
   * Simula la obtención de roles desde un backend.
   * @returns Observable<Role[]>
   */
  getRoles(): Observable<Role[]> {
    return of(RolesMock.rolesMock).pipe(
      delay(1000), // Simula un retraso en la respuesta del servidor
      catchError(this.handleError<Role[]>('getRoles', []))
    );
  }

  /**
   * Simula la obtención de un rol específico por su ID.
   * @param id ID del rol
   * @returns Observable<Role>
   */
  getRoleById(id: string): Observable<Role> {
    const role = RolesMock.rolesMock.find(r => r.id === id);
    if (role) {
      return of(role).pipe(
        delay(500), // Simula un retraso en la respuesta del servidor
        catchError(this.handleError<Role>('getRoleById'))
      );
    } else {
      return throwError(() => new Error(`Role with ID ${id} not found`)).pipe(
        catchError(this.handleError<Role>('getRoleById'))
      );
    }
  }

  /**
   * Manejo genérico de errores.
   * @param operation Nombre de la operación que falló
   * @param result Valor opcional para retornar en caso de error
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log del error
      return of(result as T); // Retorna un valor seguro para que la aplicación no falle
    };
  }
}
