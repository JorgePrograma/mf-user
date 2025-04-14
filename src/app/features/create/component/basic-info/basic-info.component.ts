// basic-info.component.ts
import { Component, Input, inject, computed, Signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importa el componente dinámico
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component'; // Ajusta la ruta si es necesario

// Servicio para obtener tipos de documento
import { DocumentTypeService } from '../../services/document-type/document-type.service';
import { DocumentTypeModel } from '../../model/document-type.model';
import { DynamicFormFieldModel } from '../../model/dynamic-form-field.model';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFieldComponent // Importa el componente dinámico
  ],
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInfoComponent implements OnInit {
  @Input({ required: true }) formGroupRef!: FormGroup; // Recibe el FormGroup específico

  private documentTypeService = inject(DocumentTypeService);

  // Señal que obtiene los tipos de documento del servicio
  private documentTypesSignal: Signal<DocumentTypeModel[]> = this.documentTypeService.documentTypesSignal;

  // Señal computada para transformar los tipos de documento al formato de opciones del select
  private documentTypeOptions = computed(() => {
    return this.documentTypesSignal().map(type => ({
      value: type.id, // O podría ser type.prefix si prefieres guardar eso
      label: `${type.name} (${type.prefix})`
    }));
  });

  // Define la configuración de los campos para esta sección
  basicInfoFields!: DynamicFormFieldModel[];

  ngOnInit() {
    // Construimos la configuración aquí para poder usar la señal computada
    this.basicInfoFields = [
      {
        controlName: 'documentType',
        label: 'Tipo de Documento',
        type: 'select',
        options: this.documentTypeOptions(), // Usamos el valor actual de la señal computada
        validators: [Validators.required],
        appearance: 'outline'
      },
      {
        controlName: 'documentNumber',
        label: 'Número de Documento',
        type: 'text', // Podría ser 'number', pero 'text' con pattern es más flexible para ceros a la izquierda, etc.
        validators: [Validators.required, Validators.pattern(/^\d+$/)],
        placeholder: '123456789',
        appearance: 'outline'
      },
      {
        controlName: 'firstName',
        label: 'Primer Nombre',
        type: 'text',
        validators: [Validators.required],
        placeholder: 'Juan',
        appearance: 'outline'
      },
      {
        controlName: 'middleName',
        label: 'Segundo Nombre',
        type: 'text',
        placeholder: 'Carlos (Opcional)',
        appearance: 'outline'
        // No required validator
      },
      {
        controlName: 'lastName',
        label: 'Primer Apellido',
        type: 'text',
        validators: [Validators.required],
        placeholder: 'Pérez',
        appearance: 'outline'
      },
      {
        controlName: 'secondLastName',
        label: 'Segundo Apellido',
        type: 'text',
        placeholder: 'Gómez (Opcional)',
        appearance: 'outline'
        // No required validator
      }
    ];

    // Nota: Si los documentTypeOptions pudieran cambiar *después* de OnInit
    // (por ejemplo, cargados asíncronamente después), necesitarías un enfoque
    // más reactivo para actualizar las opciones en la configuración o pasar
    // la señal directamente al DynamicFormFieldComponent (requeriría modificarlo).
    // Para este caso, asumimos que los tipos de documento están disponibles síncronamente.
  }
}
