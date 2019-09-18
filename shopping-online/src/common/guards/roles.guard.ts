// import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor( private readonly reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//         const role = this.reflector.get<string[]>('role', context.getHandler());
//         if (!role) {
//             return true;
//         }
        
//         const request = context.switchToHttp().getRequest();
//         const user = request.user;
//         const hasRole = () => user.role.some(role => !!role.find(item => item === role ));

//         return user && user.role && hasRole();
//     }
// }




import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../decorator';
import * as jwtDecode from 'jwt-decode'
import { retry } from 'rxjs/operators';

const username = 'username';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const methodEndpointRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const classEndpointRoles = this.reflector.get<string[]>('roles', context.getClass()) || [];
    let endpointRoles = [...methodEndpointRoles, ...classEndpointRoles];

    console.log(endpointRoles);
    if (!endpointRoles || endpointRoles.length === 0) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const [request, response] = [httpContext.getRequest(), httpContext.getResponse()];

    let token = request.headers['x-access-token'] || request.headers['authorization'];
    //const token = request.authInfo.token;
    const userRoles = jwtDecode(token).role;
    console.log(userRoles);

    if (!token || !userRoles) {
      throw new UnauthorizedException('RoleGuard should have been executed after AuthGuard');
    }
    // else if(userRoles === 'admin'){
    //   userRoles[] = ('user');
    // }
    // console.log(userRoles);

    // FIXME: useless
    if (endpointRoles.includes(RolesEnum.SELF)) {
      if (token.preferred_username === this.resolveUsername(request)) {
        return true;
      } else {
        throw new ForbiddenException(`SELF use only`);
      }
    }

    if (endpointRoles.includes(RolesEnum.ADMIN)) {
      if (this.isRoleOverlay(userRoles, [RolesEnum.ADMIN])) {
        return true;
      } else {
        throw new ForbiddenException(`NgxWeb admin users only`);
      }
    }

    if (endpointRoles.includes(RolesEnum.USER)) {
      if (this.isRoleOverlay(userRoles, [RolesEnum.USER, RolesEnum.ADMIN])) {
        return true;
      } else {
        throw new ForbiddenException(`NgxWeb users`);
      }
    }

    if (this.isRoleOverlay(userRoles, endpointRoles)) {
      return true;
    } else {
      throw new ForbiddenException(`${endpointRoles} roles only allowed`);
    }
  }

  private isRoleOverlay(userRoles, authRoles) {
    console.log(authRoles);
    let result = null;
    let i = 0;
    while (i < authRoles.length){
      if(userRoles.includes(authRoles[i])) {
        return true;
      }else{
        i += 1;
      }
      
    }

    return false;
  }

  private resolveUsername(request: any) {
    if (request.method === 'GET' || request.method === 'DELETE') {
      return request.params[username] || request.query[username];
    }

    if (request.method === 'POST' || request.method === 'PATCH' || request.method === 'PUT') {
      return request.params[username] || request.body[username];
    }
    return null;
  }
}