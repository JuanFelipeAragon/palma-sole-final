import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"


const PUBLIC_KEY = "pk_live_51OMvuBCQQGfe7j4QEK1mwo8vVQXb5r4mrtNT1eH0SqwvyjdbVZER6IOWSYPMog5i9fB3dGdB8QHWMlHHafKqmHBL00e5TXVbEa"

const StripeContainer = () => {
    const stripeTestPromise = loadStripe(PUBLIC_KEY)
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm />
    </Elements>
  )
}

export default StripeContainer
