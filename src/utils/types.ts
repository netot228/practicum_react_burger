
export interface IngredientData {
    _id: string|number
    type: string
    name: string
    image: string
    price: number
    qnt?: number

    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
    image_large?: string
    __v?: number,
    uid?: string|number
}

export interface IngredientsState {
    ingredients: IngredientData[],
    ingredientsRequest: true | false,
    ingredientsFailed: true | false
}

export interface IngredientsAction {
    type: string,
    ingredients: IngredientData[],
    ingredient: IngredientData
}

export interface ModalProps {
    title?: string
    children?: React.ReactNode
    onClose: () => void
    className?: string
}

export interface ConstructorState {
    topping: IngredientData[] | [],
    bun: IngredientData | null
}
export interface ConstructorAction {
    type: string,
    ingredient: IngredientData,
    uid?: string | number | undefined
}

export interface DropObj {
    _id?: string | number | undefined
}