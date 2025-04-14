import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { BranchModel } from "../../model/branch.model";
import { ResponseModel } from "../../model/response.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly apiUrl = 'https://femrwzf6x6uakaqkb32tl27hgm.apigateway.sa-bogota-1.oci.customer-oci.com/api/v1/Redis/getValue/branches';

  // Señal privada para el estado interno
  private readonly _branches = signal<BranchModel[]>([]);

  // Señal pública de solo lectura
  public readonly branchSignal = this._branches.asReadonly();

  constructor(private readonly http: HttpClient) { }

  getAllBranches(): Observable<BranchModel[]> {
    return this.http.get<ResponseModel<string>>(this.apiUrl).pipe(
      map(response => {
        try {
          const parsedData = JSON.parse(response.data) as { branches: BranchModel[] };
          return parsedData.branches || [];
        } catch (error) {
          console.error('Error parseando JSON:', error);
          return [];
        }
      }),
      tap(branches => {
        this._branches.set(branches);
        console.log('Sucursales actualizadas:', branches);
      }),
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return of([]);
      })
    );
  }
}
