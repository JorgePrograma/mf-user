import { Role } from "../model/role.model";

export class RolesMock {
  public static rolesMock: Role[] = [
    { id: '1', name: 'Administrador' },
    { id: '2', name: 'Editor' },
    { id: '3', name: 'Usuario' },
    { id: '4', name: 'Invitado' },
    { id: '5', name: 'Supervisor' },
    { id: '6', name: 'Gerente' },
    { id: '7', name: 'Desarrollador' },
    { id: '8', name: 'Analista' }
  ];
}
