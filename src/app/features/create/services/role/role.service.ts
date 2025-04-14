import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Config } from '../../core/utils/config';
import { EndPoints } from '../../core/utils/endpoints';
import { ResponseModel } from '../../model/response.model';
import { Role } from '../../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // Señal privada para el estado interno
  private readonly _roles = signal<Role[]>([]);

  // Señal pública de solo lectura
  public readonly rolesSignal = this._roles.asReadonly();

  constructor(private readonly http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Config.TOKEN}`, // Asegúrate de tener un método getToken()
      // Si necesitas otros headers específicos para CORS, agrégalos aquí
      'Access-Control-Allow-Origin': '*', // Normalmente esto se configura en el backend
    });
    const options = { headers };

    return this.http
      .get<ResponseModel<string>>(
        'https://femrwzf6x6uakaqkb32tl27hgm.apigateway.sa-bogota-1.oci.customer-oci.com/api/v1/Roles/GetAllRole/',
        options
      )
      .pipe(
        map((response) => {
          try {
            const parsedData = JSON.parse(response.data) as { roles: Role[] };
            console.log('roles', parsedData);
            return parsedData.roles || [];
          } catch (error) {
            console.error('Error parseando JSON:', error);
            return [];
          }
        }),
        tap((roles) => {
          this._roles.set(roles);
          console.log('Roles actualizadas:', roles);
        }),
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          return of([]);
        })
      );
  }
}
