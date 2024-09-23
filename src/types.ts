// Продукт
export interface ProductWithRating {
	id: number;
	name: string;
	rating?: number;
	price: number;
	image: string;
	category: string;
}
export interface Category {
	id: number;
	name: string;
	product: ProductWithRating[];
}

// Формы
export type InputData = {
	type: string;
	name: string;
	placeholder: string;
};