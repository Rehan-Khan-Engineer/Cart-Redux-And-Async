import { useDispatch, useSelector } from "react-redux";
import { myCartButtonActions } from "../../store/showCart-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cartUpdates.totalQuantity);

  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(myCartButtonActions.showCart());
  };

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
