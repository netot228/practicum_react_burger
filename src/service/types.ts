export interface IngredientData {
    _id: string | number;
    type: string;
    name: string;
    image: string;
    price: number;
    qnt?: number;

    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    image_large?: string;
    __v?: number;
    uid?: string | number;
}

export interface IngredientsState {
    ingredients: IngredientData[];
    ingredientsRequest: true | false;
    ingredientsFailed: true | false;
    selectedIngredient: IngredientData | null;
}

export interface IngredientsAction {
    type: string;
    ingredients: IngredientData[];
    ingredient: IngredientData;
}

export interface ModalProps {
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
    className?: string;
}

export interface ConstructorState {
    topping: IngredientData[] | [];
    bun: IngredientData | null;
}

export interface ConstructorAction {
    type: string;
    ingredient: IngredientData;
    uid?: string | number | undefined;
    moveItemFromPos: number;
    moveItemToPos: number;
}

export interface DragItem {
    _id?: string | number | undefined;
    uid?: string;
    index?: number;
}

export interface OrderData {
    name: string;
    order: { number: number };
    success: boolean;
}

export interface OrderState {
    ingredients: string[];
    orderData: OrderData | null;
    notice: string | null;
    success: boolean;
}
export interface OrderAction {
    type: string;
    notice?: string;
    json?: OrderData;
    order?: string[];
}

export interface SelectedIngredientState {
    ingredient: IngredientData | null;
}

export interface SelectedIngredientAction {
    type: string;
    ingredient?: IngredientData;
}

// auth types

export interface UserData {
    email: string | undefined;
    password?: string | undefined;
    name?: string | undefined;
}
export interface UserState {
    success?: boolean;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    user?: UserData;
    resetPassword?: boolean;

    registerFailed?: boolean;
    requestRegister?: boolean;
    accessTokenDie?: number;
}
export interface UserAction {
    type: string;
    payload: {
        success?: boolean;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        user?: UserData;
        resetPassword?: boolean;

        requestRegister?: boolean;

        pass?: string;
    };
}

export interface ResetPassData {
    token: string;
    password: string;
}

export interface BunProps {
    type?: "bottom" | "top" | undefined;
    bun?: IngredientData | null;
}

export interface ToppingBlockProps {
    topping: IngredientData[] | [];
    decreaseItem: (item: IngredientData | undefined) => void;
}

export interface ToppingProps {
    topping: IngredientData | null;
    index: number;
    removeTopping?: (uid: string | number | undefined) => void;
    moveTopping?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IngredientBlockData {
    ingredients: IngredientData[];
    value: string;
    title: string;
}

export interface IngredientProps {
    data: IngredientData;
    key?: string | number;
}

export interface BurgerProps {
    ingredients: IngredientData[];
}

export interface IngredientDetailsItemPops {
    title: string;
    value: number;
}

// sprint 5

export interface OrderItem {
    ingredients: [];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}
export interface WS_FeedState {
    success: boolean;
    error: boolean;
    orders: OrderItem[];
    total: number;
    totalToday: number;
}

export interface WS_FeedAction {
    type: string;
    payload?: {};
}

export type TAppAction =
    | IngredientsAction
    | ConstructorAction
    | OrderAction
    | SelectedIngredientAction
    | UserAction
    | WS_FeedAction;
