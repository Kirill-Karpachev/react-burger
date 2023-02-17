export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: "bun" | "main" | "sauce";
  readonly price: any;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly id?: string;
};

export type TFeed = {
  readonly createdAt: string;
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};
