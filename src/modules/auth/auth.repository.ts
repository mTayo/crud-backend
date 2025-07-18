import prisma from "../../config/db";

export const createUser = (data: any) => {
  return prisma.user.create({ data });
};

export const findByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
