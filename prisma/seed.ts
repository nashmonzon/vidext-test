import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear documentos de ejemplo
  const document1 = await prisma.document.create({
    data: {
      title: "Document 1",
      shapes: {
        create: [
          { type: "circle", properties: { radius: 50, color: "red" } },
          {
            type: "rectangle",
            properties: { width: 100, height: 50, color: "blue" },
          },
        ],
      },
    },
  });

  const document2 = await prisma.document.create({
    data: {
      title: "Document 2",
      shapes: {
        create: [
          {
            type: "triangle",
            properties: { base: 60, height: 80, color: "green" },
          },
        ],
      },
    },
  });

  console.log({ document1, document2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
