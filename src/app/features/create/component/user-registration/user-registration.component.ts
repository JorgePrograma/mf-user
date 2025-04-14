import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Componentes de Sección
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ContactInfoComponent } from "../contact-info/contact-info.component";
import { EmployeeInfoComponent } from "../employee-info/employee-info.component";
import { AccountInfoComponent } from "../account-info/account-info.component";

// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    BasicInfoComponent,
    ContactInfoComponent,
    EmployeeInfoComponent,
    AccountInfoComponent
  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  private fb = inject(FormBuilder);
  registrationForm!: FormGroup;
  isEditable = true;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      basicInfo: this.fb.group({
        documentType: ['CC', Validators.required],
        documentNumber: ['1234567890', [Validators.required, Validators.pattern(/^\d+$/)]],
        firstName: ['jorge', Validators.required],
        middleName: [''],
        lastName: ['martelo', Validators.required],
        secondLastName: ['']
      }),
      contactInfo: this.fb.group({
        country: ['CC', Validators.required],
        city: ['CC', Validators.required],
        department: ['CC', Validators.required],
        address: ['mc - de e', [Validators.required]],
        email: ['jorge', Validators.required],
        phone: ['3123456789'],
      }),
      employeeInfo: this.fb.group({
        bussinesEmail: ['CC', Validators.required],
        bussinesPhone: ['1234567890', [Validators.required, Validators.pattern(/^\d+$/)]],
        idPosition: ['jorge', Validators.required],
        idBranch: ['martelo', Validators.required],
        idRole: ['martelo', Validators.required],
        idGroup: [[], Validators.required] ,
      }),
      accountInfo: this.fb.group({
        avatar: ['CC', Validators.required],
        idRole: ['martelo', Validators.required],
        isDirectoryActive: [false, [Validators.required]],
        user: ['', Validators.required],
        password: ['', Validators.required],
        confirmationPassword: ['', Validators.required]
      })
    });
  }

  getFormGroup(groupName: string): FormGroup {
    return this.registrationForm.get(groupName) as FormGroup;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Formulario válido:', this.registrationForm.value);

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: 'Éxito!',
        text: 'Usuario registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } else {
      console.log('Formulario inválido. Revisar pasos.');
      console.log("Errores:", this.getFormErrors(this.registrationForm));
      this.registrationForm.markAllAsTouched();

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, revisa los campos del formulario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Helper para ver errores (opcional, para depuración)
  getFormErrors(form: AbstractControl): any {
    if (!form) { return null; }

    const result: any = {};

    if (form.errors) {
      result['_self'] = form.errors;
    }

    if ((form as FormGroup).controls) {
      for (const key in (form as FormGroup).controls) {
        const controlErrors = this.getFormErrors((form as FormGroup).get(key)!);
        if (controlErrors) {
          result[key] = controlErrors;
        }
      }
    }

    return result;
  }
}
