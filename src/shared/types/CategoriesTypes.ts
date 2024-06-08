declare namespace CategoriesTypes {
  interface Category {
    _id: string;
    name: string;
    code: string | undefined;
  }

  type CreateCategory = Omit<Category, '_id'>;
}
