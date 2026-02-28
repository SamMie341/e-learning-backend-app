import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../constants/role.constant";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('ບໍ່ພົບຜູ້ໃຊ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
        }

        const hasRole = requiredRoles.some((role) => user.role == role);
        if (!hasRole) {
            throw new ForbiddenException('ທ່ານບໍ່ມີສິດເຂົ້າເຖິງຂໍ້ມູນສ່ວນນີ້');
        }

        return true;
    }
}