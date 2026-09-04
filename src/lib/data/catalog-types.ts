export interface CatalogOption {
  name: string;
  priceCents: number;
  isDefault?: boolean;
  unavailable?: boolean;
}

export interface CatalogOptionGroup {
  name: string;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  options: CatalogOption[];
}

export interface CatalogProduct {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  categorySlug: string;
  allergens?: string;
  badge?: string;
  isPopular?: boolean;
  image: string;
  optionGroups?: CatalogOptionGroup[];
  unavailable?: boolean;
}

export interface CatalogCategory {
  slug: string;
  name: string;
  emoji: string;
  sortOrder: number;
}
