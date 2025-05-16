import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

import { Membership } from "@calcom/prisma/client";

export type GetMembershipReturnType = Membership;

export const GetMembership = createParamDecorator<
  keyof GetMembershipReturnType | (keyof GetMembershipReturnType)[],
  ExecutionContext
>((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const membership = request.membership as GetMembershipReturnType;

  if (!membership) {
    throw new UnauthorizedException("Membership not found in request");
  }

  if (Array.isArray(data)) {
    return Object.fromEntries(data.map((key) => [key, membership[key]]));
  }

  if (data) {
    return membership[data];
  }

  return membership;
});
