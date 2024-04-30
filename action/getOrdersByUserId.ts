import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(userid: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
      where: {
        userId: userid,
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
