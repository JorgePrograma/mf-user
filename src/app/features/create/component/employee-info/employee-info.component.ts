import { Component, Input, inject, computed, Signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// Componentes y modelos
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormFieldModel } from '../../model/dynamic-form-field.model';
import { BranchService } from '../../services/branch/branch.service';
import { PostService } from '../../services/post/post.service';
import { BranchModel } from '../../model/branch.model';
import { PostModel } from '../../model/post.model';
import { DocumentTypeModel } from '../../model/document-type.model';
import { DocumentTypeService } from '../../services/document-type/document-type.service';
import { GroupService } from '../../services/group/group.service';
import { GroupModel } from '../../model/group.model';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFieldComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoComponent implements OnInit {
  @Input({ required: true }) formGroupRef!: FormGroup;

  // Servicios
  private readonly documentTypeService = inject(DocumentTypeService);
  private readonly postService = inject(PostService);
  private readonly branchService = inject(BranchService);
  private readonly groupService = inject(GroupService);

  // Señales para obtener datos
  private readonly documentTypesSignal = this.documentTypeService.documentTypesSignal;
  private readonly postSignal = this.postService.postSignal;
  private readonly branchSignal = this.branchService.branchSignal;
  private readonly groupSignal = this.groupService.groupSignal;

  // Configuración de la tabla
  displayedColumns: string[] = ['name', 'description', 'actions'];
  selectedGroups: GroupModel[] = [];

  // Señales computadas para opciones
  documentTypeOptions = computed(() => {
    return this.documentTypesSignal().map(type => ({
      value: type.id,
      label: `${type.name} (${type.prefix})`
    }));
  });

  postOptions = computed(() => {
    return this.postSignal().map(post => ({
      value: post.id,
      label: post.name
    }));
  });

  branchOptions = computed(() => {
    const branches = this.branchSignal();
    console.log('Branches disponibles:', branches);
    return branches.map(branch => ({
      value: branch.id,
      label: `${branch.name} (${branch.id})`
    }));
  });

  groupOptions = computed(() => {
    return this.groupSignal().map(group => ({
      value: group.id,
      label: group.name
    }));
  });

  // Señal computada para campos del formulario
  basicInfoFields = computed<DynamicFormFieldModel[]>(() => {
    return [
      {
        controlName: 'idBranch',
        label: 'Sucursal',
        type: 'select',
        options: this.branchOptions(),
        validators: [Validators.required],
        appearance: 'outline'
      },
      {
        controlName: 'idPosition',
        label: 'Cargo',
        type: 'select',
        options: this.postOptions(),
        validators: [Validators.required],
        appearance: 'outline'
      },
      {
        controlName: 'bussinesEmail',
        label: 'Correo Corporativo',
        type: 'text',
        validators: [Validators.required, Validators.pattern(/^\d+$/)],
        placeholder: '123456789',
        appearance: 'outline'
      },
      {
        controlName: 'bussinesPhone',
        label: 'Celular',
        type: 'text',
        validators: [Validators.required],
        placeholder: 'Juan',
        appearance: 'outline'
      },
      {
        controlName: 'idGroup',
        label: 'Agregar Grupo',
        type: 'select',
        options: this.groupOptions(),
        validators: [Validators.required],
        appearance: 'outline',
        onChange: (event: any) => this.addGroup(event.value)
      }
    ];
  });

  ngOnInit() {
    // Cargar datos iniciales
    this.branchService.getAllBranches().subscribe();
  }

  addGroup(groupId: string) {
    const group = this.groupSignal().find(g => g.id === groupId);
    if (group && !this.selectedGroups.some(g => g.id === groupId)) {
      this.selectedGroups = [...this.selectedGroups, group];
      this.updateFormGroup();
    }
  }

  removeGroup(groupId: string) {
    this.selectedGroups = this.selectedGroups.filter(group => group.id !== groupId);
    this.updateFormGroup();
  }

  private updateFormGroup() {
    const selectedIds = this.selectedGroups.map(group => group.id);
    this.formGroupRef.get('idGroup')?.setValue(selectedIds);
  }
}
