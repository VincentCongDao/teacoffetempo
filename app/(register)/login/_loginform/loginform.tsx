"use client";

import Input from "@/components/(inputs)/input";
import Heading from "@/components/Heading";
import Button from "@/components/button";
import { SafeUser } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

interface LoginFormProps {
  currentUser: SafeUser | null;
}
const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged In");
      } else if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  if (currentUser) {
    return <p className="text-center">Already Login In. Redirect...</p>;
  }
  return (
    <>
      <Heading title="Welcome back!" />
      <Button
        outline
        label="Sign Up with Google"
        icon={FaGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
        label={isLoading ? "Loading" : "Login in"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="">
        Do not have an account?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
