import { NotificationService } from './../../services/notification/notification.service';
import { EmployeeInfoModel } from './../../model/employee-info.model';
import { BasicInfoModel } from './../../model/basic-info.model';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Componentes de Sección
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { AccountInfoComponent } from '../account-info/account-info.component';

// SweetAlert2
import Swal from 'sweetalert2';
import { ContactInfoModel } from '../../model/contact-info.model';
import { UserService } from '../../services/user/user.service';
import { forkJoin } from 'rxjs';

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
    AccountInfoComponent,
  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly notificationService = inject(NotificationService);
  registrationForm!: FormGroup;
  isEditable = true;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      basicInfo: this.fb.group({
        documentType: ['CC', Validators.required],
        documentNumber: [
          '1234567890',
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        firstName: ['jorge', Validators.required],
        middleName: [''],
        lastName: ['martelo', Validators.required],
        secondLastName: [''],
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
        bussinesPhone: [
          '1234567890',
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        idPosition: ['jorge', Validators.required],
        idBranch: ['martelo', Validators.required],
        idRole: ['martelo', Validators.required],
        idGroup: [[], Validators.required],
      }),
      accountInfo: this.fb.group({
        avatar: ['CC', Validators.required],
        idRole: ['martelo', Validators.required],
        isDirectoryActive: [false, [Validators.required]],
        user: ['', Validators.required],
        password: ['', Validators.required],
        confirmationPassword: ['', Validators.required],
      }),
    });
  }

  getFormGroup(groupName: string): FormGroup {
    return this.registrationForm.get(groupName) as FormGroup;
  }

  onSubmit(): void {
    const { basicInfo, contactInfo, employeeInfo, accountInfo } =
      this.registrationForm.value;

    const basicInfoModel: BasicInfoModel = {
      documentType: basicInfo.documentType,
      documentNumber: basicInfo.documentNumber,
      firstName: basicInfo.firstName,
      middleName: basicInfo.middleName || undefined,
      lastName: basicInfo.lastName,
      secondLastName: basicInfo.secondLastName || undefined,
    };

    this.userService
      .registerUser(
        basicInfoModel,
        {
          address: contactInfo.address,
          email: contactInfo.email,
          phone: contactInfo.phone,
        },
        {
          bussinesEmail: employeeInfo.bussinesEmail,
          bussinesPhone: employeeInfo.bussinesPhone,
          idPosition: employeeInfo.idPosition,
          idBranch: employeeInfo.idBranch,
        },
        accountInfo
      )
      .subscribe((success) => {
        if (success) {
          this.registrationForm.reset();
        }
      });
  }

  // Helper para ver errores (opcional, para depuración)
  getFormErrors(form: AbstractControl): any {
    if (!form) {
      return null;
    }

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
