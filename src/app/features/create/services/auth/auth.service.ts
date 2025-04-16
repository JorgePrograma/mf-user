import { Injectable } from '@angular/core';
import { Config } from '../../core/utils/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string {
    // Para una implementación más segura, considera usar sessionStorage en lugar de un valor estático
    return Config.TOKEN;
  }

  // Verificar si el token es válido
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Verificación básica - se podría mejorar con decodificación JWT para verificar la expiración
    return true;
  }
}
