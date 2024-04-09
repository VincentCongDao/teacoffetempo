"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  console.log("PaymentIntent: ", paymentIntent);
  console.log("ClientSecret: ", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.paymentIntent && data.paymentIntent.client_secret) {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            // Handle the scenario where paymentIntent is not in the data
            console.error(
              "PaymentIntent or client_secret is missing in the response"
            );
            toast.error("Payment processing error. Please try again.");
          }
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent]);
  return (
    <>
      <div className="">Check out</div>
    </>
  );
};

export default CheckOutClient;
