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
    ingredientsFailed: true | false,
    selectedIngredient: IngredientData | null
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
    uid?: string | number | undefined,
    moveItemFromPos: number,
    moveItemToPos: number
    // endPos: number
}

export interface DragItem {
    _id?: string | number | undefined,
    uid?: string,
    index?: number
}

export interface OrderData {
    name: string
    order: {number:number}
    success: boolean
}

export interface OrderState {
    ingredients: string[],
    orderData: OrderData | null,
    notice: string | null,
    success: boolean
}
export interface OrderAction {
    type: string,
    notice?: string,
    json?: OrderData,
    order?: string[]
}

export interface SelectedIngredientState {
    ingredient: IngredientData | null
}

export interface SelectedIngredientAction {
    type: string
    ingredient?: IngredientData
}


// auth types

export interface UserData {
    email: string,
    password?: string,
    name?: string
}
export interface UserState {
    success?: boolean,
    accessToken?: string | undefined,
    refreshToken?: string | undefined,
    user?: UserData
}
export interface UserAction {
    type: string,
    payload: UserState
}
