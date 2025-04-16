export class EndPoints{
  private static readonly base_url = "https://femrwzf6x6uakaqkb32tl27hgm.apigateway.sa-bogota-1.oci.customer-oci.com/api/v1"
  static readonly GET_ALL_BRANCHES =this.base_url+"/Redis/getValue/branches"
  static readonly GET_ALL_LOCATIONS =this.base_url+"/Redis/getValue/location"
  static readonly GET_ALL_ROLES = this.base_url+"/Roles/GetAllRole"
  static readonly GET_ALL_GROUPS = this.base_url+"/Roles/GetAllRole"
  static readonly GET_ALL_DOCUMENTS_TYPE = this.base_url+"/Roles/GetAllRole"
  static readonly GET_ALL_POST = this.base_url+"/Roles/GetAllRole"

  static readonly CREATE_PEOPLE =this.base_url+"/Person/Create"
  static readonly CREATE_CONTACT =this.base_url+"/ContactDetails/Create/"
  static readonly CREATE_EMPLOYEE =this.base_url+"/Employee/Create"
  static readonly CREATE_ACCOUNT =this.base_url+"/Employee/Create"
}
