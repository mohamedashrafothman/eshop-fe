import vars from "utils/vars";

export const isUserRoleAdmin = (role: string) => role === vars.roles.admin;
export const isUserRoleUser = (role: string) => role === vars.roles.user;
export const isUserRoleSuperAdmin = (role: string) => role === vars.roles.superAdmin;
