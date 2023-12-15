import axios from "axios";
// import { useSelector } from "react-redux";


const PayButton = ({ cartItems }) => {
//   const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post('http:/create-checkout-session', {
        cartItems
        // userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button className="btn btn-dark" onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;