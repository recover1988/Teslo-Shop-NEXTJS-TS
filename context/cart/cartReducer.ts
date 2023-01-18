import { ICartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in car', payload: ICartProduct[] }
    | { type: '[Cart] - Change cart quantity', payload: ICartProduct }
    | { type: '[Cart] - Remover product in cart', payload: ICartProduct }
    | { type: '[Cart] - LoadAddress from Cookies', payload: ShippingAddress }
    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }

export const cartReducer = (state: CartState, action: CartActionType ): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            };
        case '[Cart] - Update products in car':
            return {
                ...state,
                cart: [...action.payload]
            };
        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;
                    // product.quantity = action.payload.quantity
                    // return product
                    return action.payload

                })
            };
        case '[Cart] - Remover product in cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
                // otra forma es poner la condicion de verdadero pero negandola
                //  product._id !== action.payload._id && product.size !== action.payload.size
            };
        case '[Cart] - LoadAddress from Cookies':
            return {
                ...state,
                shippingAddress: action.payload ,
            };
        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}