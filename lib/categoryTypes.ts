export interface Product {
  id: string;
  name: string;
  price: string;
  createdAt: Date; // or Date, adjust as per your schema
  isAvailable: boolean;
  // Add more fields as per your actual schema
}
// interface iAppProps {
//     category: "newest" | "fashion" | "food" | "electronics" | "exchanges" | "baggages" | "others";
//   }

//   async function getData({ category }: iAppProps) {
//     switch (category) {
//       case "fashion": {
//         const data = await prisma.product.findMany({
//           where: {
//             category: "fashion",
//           },
//           select: {
//             price: true,
//             name: true,
//             description: true,
//             id: true,
//             images: true,
//             category: true,
//           },
//           take: 4,
//         });

//         return {
//           data: data,
//           title: "fashion",
//           link: "/products/fashion",
//         };
//       }
//       case "newest": {
//         const data = await prisma.product.findMany({
//           select: {
//             price: true,
//             name: true,
//             description: true,
//             id: true,
//             images: true,
//             category: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//           take: 6,
//         });

//         return {
//           data: data,
//           title: "Newest Products",
//           link: "/products/all",
//         };
//       }
//       case "food": {
//         const data = await prisma.product.findMany({
//           where: {
//             category: "food",
//           },
//           select: {
//             id: true,
//             name: true,
//             price: true,
//             description: true,
//             images: true,
//             category: true,
//           },
//           take: 4,
//         });

//         return {
//           title: "food",
//           data: data,
//           link: "/products/food",
//         };
//       }
//       case "electronics": {
//         const data = await prisma.product.findMany({
//           where: {
//             category: "electronics",
//           },
//           select: {
//             id: true,
//             name: true,
//             price: true,
//             description: true,
//             images: true,
//             category: true,
//           },
//           take: 4,
//         });

//         return {
//           title: "electronics",
//           data: data,
//           link: "/products/electronics",
//         };
//       }
//       case "baggages": {
//         const data = await prisma.product.findMany({
//           where: {
//             category: "baggages",
//           },
//           select: {
//             id: true,
//             name: true,
//             price: true,
//             description: true,
//             images: true,
//             category: true,
//           },
//           take: 4,
//         });

//         return {
//           title: "baggages",
//           data: data,
//           link: "/products/baggages",
//         };
//       }
//       case "exchanges": {
//         const data = await prisma.product.findMany({
//           where: {
//             category: "exchanges",
//           },
//           select: {
//             id: true,
//             name: true,
//             price: true,
//             description: true,
//             images: true,
//             category: true,
//           },
//           take: 4,
//         });

//         return {
//           title: "exchanges",
//           data: data,
//           link: "/products/exchanges",
//         };
//       }
//       default: {
//         return notFound();
//       }
//     }
//   }
