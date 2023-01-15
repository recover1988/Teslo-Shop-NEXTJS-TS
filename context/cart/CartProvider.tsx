import { FC, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '../../interfaces'

export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface Props {
    children?: React.ReactNode | undefined,
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])



    // con este efecto guardamos los elementos en el cart
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])


    const addProductToCart = (product: ICartProduct) => {
        //! NIVEL 1
        // dispatch({type: '[Cart] - Add Product' , payload: product})

        //! NIVEL 2
        // const productsInCart = state.cart.filter(p => p._id !== product._id && p.size !== product.size)
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! NIVEL FINAL
        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in car', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in car', payload: [...state.cart, product] })

        //Acumular
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p
            // Actualizar la cantidad
            p.quantity += product.quantity
            return p

        })
        dispatch({ type: '[Cart] - Update products in car', payload: updatedProducts })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            // methods
            addProductToCart
        }} >
            {children}
        </CartContext.Provider>
    )
}