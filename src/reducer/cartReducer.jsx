export const reducer = (state, action) => {
    switch(action.type){
        case "SET__PRODUCTS" :
            return {
                ...state,
                products : action.payload,
            }

        case "SET__CART" :
            const savedCart = action.payload.cart && action.payload.cart.map(cartItem => {
                return { ...cartItem.productId, quantity : cartItem.quantity}
            })
            // console.log(savedCart)
            return { ...state, cart : savedCart}
            // return state
        
        
        case "ADD__TO__CART" :
            if(!state.cart.find((cartItem) => cartItem._id === action.payload._id)){
           return {
               ...state,
               cart : [...state.cart, { ...action.payload, quantity : 1 }]
           }
        }
        return state

        case "ADD__TO__WISHLIST" :
            if(!state.wishlist.find(wishlistItem => wishlistItem._id === action.payload._id )){
            return {
                ...state,
                wishlist : [...state.wishlist, action.payload]
            }
        }
        return state

        case "SET__WISHLIST" :
            console.log(action.payload)
            const savedWishlist = action.payload.wishlist && action.payload.wishlist.map(wishlistItem => wishlistItem.productId )
            console.log(savedWishlist)
            return { ...state, wishlist : savedWishlist }
    
        case "TOGGLE_INVENTORY":
            return (state = {
                ...state,
                showInventoryAll : !state.showInventoryAll
            })

        case "TOGGLE_DELIVERY" :
            return (state = {
                ...state,
                showFastDeliveryOnly : !state.showFastDeliveryOnly
            })

        case "sort":
            return {
                ...state,
                sortBy : action.payload
            }
            
        case "TOGGLE_PRICE_RANGE":
            return {
                ...state,
                maxValue: action.payload,
            };
        
        case "INCREASE__QUANTITY" :
            console.log(action.payload)
            return{
                ...state,
                cart : state.cart.map(item => {
                    return item._id === action.payload._id
                    ? { ...item, quantity : item.quantity + 1 }
                    : item
                })
            }

        case "DECREASE__QUANTITY" :
            return{
                ...state,
                cart : state.cart.map(item => {
                    return item._id === action.payload._id
                    ? { ...item, quantity : item.quantity - 1 }
                    : item
                })
            }

        case "REMOVE__ITEM__FROM__CART" : 
            return {
                ...state,
                cart : state.cart.filter(item => item._id !== action.payload._id )
            }

        case "REMOVE__ITEM__FROM__WISHLIST" : 
        return {
            ...state,
            wishlist : state.wishlist.filter( item => item._id !== action.payload._id )
        }

        default :
        return state
    }
}