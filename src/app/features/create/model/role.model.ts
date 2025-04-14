export interface Role {
  nameRole: string;
  descriptionRole: string;
  creationDate: Date;
  firstUseDate: Date | null;
  lastUpdateDate: Date;
  isActive: boolean;
  version: number;
  permissions: string[];
}
