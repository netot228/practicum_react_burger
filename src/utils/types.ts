
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
    __v?: number
}

export interface IngredientsState {
    ingredients: IngredientData[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
}

export interface IngredientsAction {
    type: string,
    ingredients: IngredientData[]
}

export interface ModalProps {
    title?: string
    children?: React.ReactNode
    onClose: () => void
    className?: string
}

export interface ConstructorState {
    ingredients: IngredientData[] | []
}
export interface ConstructorAction {
    type: string,
    ingredient: IngredientData
}