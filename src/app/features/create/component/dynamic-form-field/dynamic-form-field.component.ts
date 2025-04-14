import { 
  Component, Input, OnChanges, SimpleChanges 
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormFieldModel } from '../../model/dynamic-form-field.model';

@Component({
  selector: 'app-dynamic-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div [formGroup]="formGroupRef" [ngSwitch]="config.type" class="dynamic-field">
      <mat-form-field [appearance]="config.appearance || 'outline'">
        <mat-label>{{ config.label }}</mat-label>

        <!-- Input de Texto/Número/Email/Password -->
        <input *ngSwitchCase="'text'" matInput 
          [formControlName]="config.controlName" 
          [placeholder]="config.placeholder || ''">

        <input *ngSwitchCase="'number'" matInput type="number" 
          [formControlName]="config.controlName" 
          [placeholder]="config.placeholder || ''">

        <input *ngSwitchCase="'email'" matInput type="email" 
          [formControlName]="config.controlName" 
          [placeholder]="config.placeholder || ''">

        <input *ngSwitchCase="'password'" matInput type="password" 
          [formControlName]="config.controlName" 
          [placeholder]="config.placeholder || ''">

        <!-- Select -->
<mat-select *ngSwitchCase="'select'" 
  [formControlName]="config.controlName"
  (selectionChange)="config.onChange?.($event)">
  <mat-option 
    *ngFor="let option of currentOptions" 
    [value]="option.value">
    {{ option.label }}
  </mat-option>
</mat-select>

        <!-- Errores -->
        <mat-error *ngIf="formGroupRef.get(config.controlName)?.invalid 
          && formGroupRef.get(config.controlName)?.touched">
          {{ config.label }} es inválido o requerido.
        </mat-error>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .dynamic-field { margin-bottom: 5px; }
    mat-form-field { width: 100%; }
  `]
})
export class DynamicFormFieldComponent implements OnChanges {
  @Input({ required: true }) formGroupRef!: FormGroup;
  @Input({ required: true }) config!: DynamicFormFieldModel;
  currentOptions: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.currentOptions = [...(this.config.options || [])]; // Cambiar la referencia del array
      console.log('Opciones recibidas en DynamicFormFieldComponent:', this.currentOptions);
    }
  }
  
  
}
