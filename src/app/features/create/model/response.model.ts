export interface ResponseModel<T>{
  data:T,
  error?:[],
  status:number
}
