import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export enum RolesEnum {
    SELF = 'SELF',
    ADMIN = 'admin',
    USER = 'user',
  }