// location.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LocationMock } from '../../model/location.model';

export interface Country {
  pais: string;
  departamentos: Department[];
}

export interface Department {
  nombre: string;
  ciudades: string[];
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private countries = LocationMock.countriesMock;
  private readonly apiUrl = 'https://femrwzf6x6uakaqkb32tl27hgm.apigateway.sa-bogota-1.oci.customer-oci.com/api/v1/Redis/getValue/branches';

  
  getCountries(): Country[] {
    return this.countries;
  }

  getDepartments(countryName: string): Department[] {
    const country = this.countries.find(c => c.pais === countryName);
    return country?.departamentos || [];
  }

  getCities(countryName: string, departmentName: string): string[] {
    const department = this.getDepartments(countryName).find(d => d.nombre === departmentName);
    return department?.ciudades || [];
  }
}
