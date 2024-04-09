import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const response = await fetch('https://react-redux-3f78c-default-rtdb.firebaseio.com/cart.json');
            
            if(!response.ok) {
                throw new Error('Unable to fetch cart data');
            }

            const data = await response.json();
            return data;
        }
        
        try {
            const data = await fetchRequest();

            dispatch(cartActions.replaceCart({
                items: data.items || [],
                totalQuantity: data.totalQuantity,
            }));

        } catch(error) {
            dispatch(uiActions.sendNotification({
                status: 'error',
                title: 'Error!',
                message: 'Error while sending data'
            }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.sendNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data.'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-redux-3f78c-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error('Unable to send cart data');
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.sendNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data sent successfully.'
            }));
        } catch(error) {
            dispatch(uiActions.sendNotification({
                status: 'error',
                title: 'Error!',
                message: 'Error while sending data'
            }));
        }
    }
}