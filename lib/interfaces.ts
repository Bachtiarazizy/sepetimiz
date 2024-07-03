export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: string;
    imageString: string;
  }>;
};
