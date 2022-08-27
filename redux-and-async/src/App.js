import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData2, sendCartData2 } from "./store/cart-actions-thunk";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.myCartButton.showCart);
  const notification = useSelector((state) => state.myCartButton.notification);

  const entireCartSlice = useSelector((state) => state.cartUpdates);

  const dispatch = useDispatch();

  // useeffect for fetching cart data from firebase
  useEffect(() => {
    dispatch(fetchCartData2());
  }, [dispatch]);

  //useeffect for sending cart data to firebase
  useEffect(() => {
    if (!isInitial) {
      isInitial = false;
      return;
    }

    if (entireCartSlice.changed) {
      //calling Action creater thunk
      dispatch(sendCartData2(entireCartSlice));
    }
  }, [entireCartSlice, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
