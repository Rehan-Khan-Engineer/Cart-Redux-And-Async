import { cartUpdatesActions } from "./cart-slice";
import { myCartButtonActions } from "./showCart-slice";

//-----------------------------------------------------------------------------
//Action creater thunk for sending data to firebase.
export const sendCartData2 = (entireCartSlice) => {
  return (dispatch) => {
    const sendCartData = async () => {
      dispatch(
        myCartButtonActions.showNotification({
          status: "Pending",
          message: "Sending Cart Data!",
          title: "Sending...",
        })
      );

      const response = await fetch(
        "https://redux-cart-4ee07-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: entireCartSlice.items,
            totalQuantity: entireCartSlice.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      // const responseData = await response.json();

      dispatch(
        myCartButtonActions.showNotification({
          status: "success",
          message: "Sent Cart Data Successfully!",
          title: "Success!",
        })
      );
    };

    sendCartData().catch((error) => {
      console.log(error);
      dispatch(
        myCartButtonActions.showNotification({
          status: "error",
          message: "Sending Cart Data Failed!",
          title: "Error!",
        })
      );
    });
  };
};

//-----------------------------------------------------------------------------
//Action creater thunk for getting/fetching cart data from firebase (to display it)

export const fetchCartData2 = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://redux-cart-4ee07-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchCartData();

      dispatch(
        cartUpdatesActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        myCartButtonActions.showNotification({
          status: "error",
          message: "Fetching Cart Data Failed!",
          title: "Error!",
        })
      );
    }
  };
};
