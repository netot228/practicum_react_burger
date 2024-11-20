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
