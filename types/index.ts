// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PRODUCT PARAMS
export type CreateProductParams = {
  userId: string;
  product: {
    productId: string;
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    price: string;
    footPocketColor: string;
  };
  path: string;
};

export type UpdateProductParams = {
  userId: string;
  product: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    categoryId: string;
    price: string;
  };
  path: string;
};

export type DeleteProductParams = {
  productId: string;
  path: string;
};

export type GetAllProductsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetProductsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedProductsByCategoryParams = {
  categoryId: string;
  productId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS

export type CheckoutOrderParams = {
  productTitle: string;
  productId: string;
  price: string;
  buyerId: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
};

export type CreateOrderParams = {
  stripeId: string;
  productId: string;
  buyerId: string;
  totalAmount: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
  createdAt: Date;
};

export type GetOrdersByProductParams = {
  productId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
