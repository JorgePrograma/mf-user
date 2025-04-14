import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicInfoModel } from '../../model/basic-info.model';
import { ContactInfoModel } from '../../model/contact-info.model';
import { EmployeeInfoModel } from '../../model/employee-info.model';
import { AccountModel } from '../../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Definimos las URLs del backend
  private readonly baseUrl = 'https://api.example.com'; // Cambia por tu URL base
  private readonly basicInfoEndpoint = `${this.baseUrl}/basic-info`;
  private readonly contactInfoEndpoint = `${this.baseUrl}/contact-info`;
  private readonly employeeInfoEndpoint = `${this.baseUrl}/employee-info`;
  private readonly accountEndpoint = `${this.baseUrl}/account`;

  constructor(private http: HttpClient) {}

  /**
   * Guarda la información básica del usuario.
   * @param model Información básica del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  saveBasicInfo(model: BasicInfoModel): Observable<any> {
    return this.http.post(this.basicInfoEndpoint, model).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  /**
   * Guarda la información de contacto del usuario.
   * @param model Información de contacto del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  saveContactInfo(model: ContactInfoModel): Observable<any> {
    return this.http.post(this.contactInfoEndpoint, model).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  /**
   * Guarda la información laboral del empleado.
   * @param model Información laboral del empleado.
   * @returns Observable con la respuesta del servidor.
   */
  saveEmployeeInfo(model: EmployeeInfoModel): Observable<any> {
    return this.http.post(this.employeeInfoEndpoint, model).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  /**
   * Guarda la información de cuenta del usuario.
   * @param model Información de cuenta del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  saveAccountInfo(model: AccountModel): Observable<any> {
    return this.http.post(this.accountEndpoint, model).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  /**
   * Manejo centralizado de errores HTTP.
   * @param error Error recibido desde HttpClient.
   * @returns Observable que lanza el error procesado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: Código ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage); // Registrar el error en la consola
    return throwError(() => new Error(errorMessage)); // Retornar el error procesado
  }
}
