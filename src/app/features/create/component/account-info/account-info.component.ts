import { Component, Input, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material extra
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Servicio y modelo
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInfoComponent implements OnInit {
  @Input({ required: true }) formGroupRef!: FormGroup; // Recibe el FormGroup específico

  private roleService = inject(RoleService); // Inyectamos el servicio de roles

  isDirectoryActive = false; // Estado del checkbox para mostrar/ocultar campos
  roleOptions: { value: string; label: string }[] = []; // Opciones para el campo idRole

  ngOnInit() {
    // Inicializa los controles en el FormGroup si no existen
    this.initializeFormControls();

    // Cargar roles al inicializar el componente
    this.loadRoles();
  }

  /**
   * Inicializa los controles necesarios en el FormGroup.
   */
  private initializeFormControls() {
    if (!this.formGroupRef.contains('isDirectoryActive')) {
      this.formGroupRef.addControl('isDirectoryActive', new FormControl(false));
    }
    if (!this.formGroupRef.contains('user')) {
      this.formGroupRef.addControl('user', new FormControl('', Validators.required));
    }
    if (!this.formGroupRef.contains('password')) {
      this.formGroupRef.addControl('password', new FormControl('', Validators.required));
    }
    if (!this.formGroupRef.contains('confirmationPassword')) {
      this.formGroupRef.addControl(
        'confirmationPassword',
        new FormControl('', Validators.required)
      );
    }
    if (!this.formGroupRef.contains('idRole')) {
      this.formGroupRef.addControl('idRole', new FormControl('', Validators.required));
    }
  }

  /**
   * Carga los roles desde el servicio RoleService.
   */
  private loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roleOptions = roles.map(role => ({
          value: role.id,
          label: role.name
        }));
        console.log('Roles cargados:', this.roleOptions);
      },
      error: (err) => console.error('Error al cargar roles:', err)
    });
  }

  /**
   * Maneja el cambio del estado de "Directorio activo".
   * @param isActive Estado actual del checkbox.
   */
  onDirectoryActiveChange(isActive: boolean) {
    this.isDirectoryActive = isActive;

    // Habilitar o deshabilitar los campos según el estado del checkbox
    const userControl = this.formGroupRef.get('user');
    const passwordControl = this.formGroupRef.get('password');
    const confirmationPasswordControl = this.formGroupRef.get('confirmationPassword');

    if (isActive) {
      userControl?.enable();
      passwordControl?.enable();
      confirmationPasswordControl?.enable();
    } else {
      userControl?.disable();
      passwordControl?.disable();
      confirmationPasswordControl?.disable();
    }
  }
}
