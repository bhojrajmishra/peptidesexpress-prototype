import { Category } from "../types";
import { STATIC_CATEGORIES } from "../data/static-categories";

export const getCategories = async (): Promise<Category[]> => STATIC_CATEGORIES;
