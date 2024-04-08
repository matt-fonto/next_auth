"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { FormEvent } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function PaymentFormWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

function PaymentForm() {
  const stripe = useStripe(); // useStripe hook to access the Stripe instance
  const elements = useElements(); // useElements hook to access the Elements instance

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) {
        return null;
      }

      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 12 },
      });

      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-[30vh] border border-orange-400 rounded-lg p-4"
    >
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
}
