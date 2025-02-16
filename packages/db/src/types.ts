import { ProductListing, User } from "@prisma/client";

export type SellingScope = "COLLEGE_ONLY" | "ALL_COLLEGES";

export interface ProductWithUser extends Omit<ProductListing, 'user'> {
  user: Pick<User, 'name' | 'email' | 'college'>;
}

export interface Product {
  ProductId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  tags: string[];
  college: string;
  sellingScope: SellingScope;
  createdAt: string;
  user: {
    name: string;
    email: string;
    college: string;
  };
}