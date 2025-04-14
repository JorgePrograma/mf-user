import { Component, Input, inject, computed, Signal, ChangeDetectionStrategy, OnInit, signal, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CountryMock } from '../../mocks/location.mock';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent implements OnInit {
  @Input({ required: true }) formGroupRef!: FormGroup;

  protected selectedCountry = signal<string>('');
  protected selectedDepartment = signal<string>('');

  countries = CountryMock.countriesMock.map(c => ({
    value: c.pais,
    label: c.pais
  }));

  departmentOptions = computed(() => {
    const selectedCountryData = CountryMock.countriesMock.find(
      c => c.pais === this.selectedCountry()
    );

    return selectedCountryData?.departamentos.map(d => ({
      value: d.nombre,
      label: d.nombre
    })) || [];
  });

  cityOptions = computed(() => {
    const selectedCountryData = CountryMock.countriesMock.find(
      c => c.pais === this.selectedCountry()
    );

    const selectedDepartmentData = selectedCountryData?.departamentos.find(
      d => d.nombre === this.selectedDepartment()
    );

    return selectedDepartmentData?.ciudades.map(city => ({
      value: city,
      label: city
    })) || [];
  });

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.setupCountryListener();
    this.setupDepartmentListener();
  }

  private setupCountryListener() {
    const countryControl = this.formGroupRef.get('country');
    if (countryControl) {
      countryControl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => {
          console.log('País seleccionado:', value);
          this.selectedCountry.set(value); // Actualizar la señal con el valor seleccionado
          this.updateDepartments();
        });
    }
  }

  private setupDepartmentListener() {
    const departmentControl = this.formGroupRef.get('department');
    if (departmentControl) {
      departmentControl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => {
          console.log('Departamento seleccionado:', value);
          this.selectedDepartment.set(value); // Actualizar la señal con el valor seleccionado
          this.updateCities();
        });
    }
  }

  private updateDepartments() {
    const departmentControl = this.formGroupRef.get('department');
    if (departmentControl) {
      if (!this.selectedCountry()) {
        departmentControl.disable(); // Deshabilitar si no hay país seleccionado
        console.log('Departamento deshabilitado porque no hay país seleccionado.');
      } else {
        departmentControl.reset();
        departmentControl.enable(); // Habilitar el control si se seleccionó un país
        console.log('Departamentos actualizados:', [...this.departmentOptions()]);
      }
    }

    // Resetear el control de ciudad
    const cityControl = this.formGroupRef.get('city');
    if (cityControl) {
      cityControl.reset();
      cityControl.disable(); // Deshabilitar hasta que se seleccione un departamento
    }

    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  private updateCities() {
    const cityControl = this.formGroupRef.get('city');
    if (cityControl) {
      if (!this.selectedDepartment()) {
        cityControl.disable(); // Deshabilitar si no hay departamento seleccionado
        console.log('Ciudad deshabilitada porque no hay departamento seleccionado.');
      } else {
        cityControl.reset();
        cityControl.enable(); // Habilitar el control si se seleccionó un departamento
        console.log('Ciudades actualizadas:', [...this.cityOptions()]);
      }
    }

    this.cdr.detectChanges(); // Forzar detección de cambios
  }
}
