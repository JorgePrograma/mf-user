import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BasicInfoModel } from '../../model/basic-info.model';
import { ContactInfoModel } from '../../model/contact-info.model';
import { EmployeeInfoModel } from '../../model/employee-info.model';
import { AccountModel } from '../../model/account.model';
import { ResponseModel } from '../../model/response.model';
import { EndPoints } from '../../core/utils/endpoints';
import { Config } from '../../core/utils/config';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly notificationService = inject(NotificationService);

  // Configuración común de headers
  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${Config.TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  registerUser(
    basicInfo: BasicInfoModel,
    contactInfo: Omit<ContactInfoModel, 'idPerson'>,
    employeeInfo: Omit<EmployeeInfoModel, 'idPerson'>,
    accountInfo?: AccountModel
  ): Observable<boolean> {
    return this.saveBasicInfo(basicInfo).pipe(
      switchMap((basicResponse) => {
        if (basicResponse.status !== 201) {
          this.notificationService.showError(
            'Error al guardar información básica'
          );
          return of(false);
        }

        const personId = basicResponse.data;
        const fullContactInfo: ContactInfoModel = {
          ...contactInfo,
          idPerson: personId,
        };
        const fullEmployeeInfo: EmployeeInfoModel = {
          ...employeeInfo,
          idPerson: personId,
        };

        return forkJoin([
          this.saveContactInfo(fullContactInfo),
          this.saveEmployeeInfo(fullEmployeeInfo),
          accountInfo ? this.saveAccountInfo(accountInfo) : of(null),
        ]).pipe(
          switchMap((responses) => {
            const allSuccess = responses.every((r) => !r || r.status === 201);
            if (!allSuccess) {
              this.notificationService.showError(
                'Error al guardar información adicional'
              );
              return of(false);
            }
            this.notificationService.showSuccess(
              'Usuario registrado correctamente'
            );
            return of(true);
          })
        );
      }),
      catchError((error) => {
        this.notificationService.showError('Error en el proceso de registro');
        console.error('Registration error:', error);
        return of(false);
      })
    );
  }

  /**
   * Guarda la información básica del usuario
   * @param model Datos básicos del usuario
   * @returns Observable con la respuesta del servidor
   */
  saveBasicInfo(model: BasicInfoModel): Observable<ResponseModel<string>> {
    return this.http
      .post<ResponseModel<string>>(EndPoints.CREATE_PEOPLE, model, {
        headers: this.getCommonHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Guarda la información de contacto del usuario
   * @param model Datos de contacto del usuario
   * @returns Observable con la respuesta del servidor
   */
  saveContactInfo(
    model: ContactInfoModel
  ): Observable<ResponseModel<ContactInfoModel>> {
    return this.http
      .post<ResponseModel<ContactInfoModel>>(EndPoints.CREATE_CONTACT, model, {
        headers: this.getCommonHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Guarda la información laboral del empleado
   * @param model Datos laborales del empleado
   * @returns Observable con la respuesta del servidor
   */
  saveEmployeeInfo(
    model: EmployeeInfoModel
  ): Observable<ResponseModel<EmployeeInfoModel>> {
    return this.http
      .post<ResponseModel<EmployeeInfoModel>>(
        EndPoints.CREATE_EMPLOYEE,
        model,
        {
          headers: this.getCommonHeaders(),
          withCredentials: true, // Para manejo de cookies si es necesario
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Guarda la información de cuenta del usuario
   * @param model Datos de cuenta del usuario
   * @returns Observable con la respuesta del servidor
   */
  saveAccountInfo(
    model: AccountModel
  ): Observable<ResponseModel<AccountModel>> {
    return this.http
      .post<ResponseModel<AccountModel>>(EndPoints.CREATE_ACCOUNT, model, {
        headers: this.getCommonHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Manejo centralizado de errores HTTP
   * @param error Error recibido
   * @returns Observable que emite el error procesado
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    let errorDetails: any;

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
      errorDetails = { type: 'client', message: error.error.message };
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: Código ${error.status}`;
      if (error.error && typeof error.error === 'object') {
        errorDetails = {
          type: 'server',
          status: error.status,
          message: error.message,
          details: error.error,
        };
      } else {
        errorDetails = {
          type: 'server',
          status: error.status,
          message: error.message,
        };
      }
    }

    console.error('Error en UserService:', errorDetails);
    return throwError(() => ({
      message: errorMessage,
      details: errorDetails,
    }));
  }
}
