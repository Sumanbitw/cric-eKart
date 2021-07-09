import axios from "axios"

export const addToCart = ( productItem, dispatch ) => {
   (async function () {
        try{
            const productToBeAdded =  {
                productId : productItem._id,
                title : productItem.title,
                details: productItem.details,
                imageURL : productItem.imageURL,
                price : productItem.price,
                netPrice : productItem.netPrice,
                discount : productItem.discount,
                category : productItem.category,
                inStock : productItem.inStock,
                fastDelivery : productItem.fastDelivery,
                brand : productItem.brand,
                ratings : productItem.ratings,
                quantity : productItem.quantity 
            }
            const response = await axios.post("https://crickart.herokuapp.com/cart",
            productToBeAdded)
            // {
            //     headers: {
            //         "auth-token": auth.token,
            //     },
            // }
            
            dispatch({ type : "ADD__TO__CART", payload : response.data })
        }catch(error){
            console.log("From add to cart catch")
            console.log(error)
        }
    })()
}