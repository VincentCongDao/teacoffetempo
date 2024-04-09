"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForms from "../_checkoutform/checkoutform";
import Button from "@/components/button";
import Image from "next/image";
import teaPenguin from "@/public/tea-penguin.gif";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucess, setPaymentSucess] = useState(false);
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

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handlePaymentSuccess = useCallback((value: boolean) => {
    //   Update the payment success
    setPaymentSucess(value);
  }, []);
  return (
    <>
      <div className="w-full">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForms
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        )}
        {loading && (
          <div className="text-center flex flex-col gap-5">
            <div className="text-2xl">Loading Checkout...</div>
            <div className="flex justify-center">
              <Image
                src={teaPenguin}
                alt="Patience is the Key"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-rose-500">
            Something went wrong...
          </div>
        )}
        {paymentSucess && (
          <div className="text-center flex items-center flex-col gap">
            <div className="text-green-300">Payment Success</div>
            <div className="max-w-[220px] w-full">
              <Button
                label="View Your Orders"
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOutClient;
