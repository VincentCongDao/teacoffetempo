"use client";

import Input from "@/components/(inputs)/input";
import Heading from "@/components/Heading";
import Button from "@/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
            toast.success("Logged In");
          } else if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((err) => {
        console.log(err.response || err);
        toast.error(
          "Something is wrong: " + (err.response?.data?.error || err.message)
        );
      })
      .finally(() => setIsLoading(false));
  };
  if (currentUser) {
    return <p className="text-center">Already Login In. Redirect...</p>;
  }
  return (
    <>
      <Heading title="Sign up for E-Shop" />
      <Button
        outline
        label="Sign Up with Google"
        icon={FaGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Log In
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
