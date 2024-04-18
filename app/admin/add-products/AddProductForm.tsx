"use client";

import Input from "@/components/(inputs)/input";
import TextArea from "@/components/(inputs)/textarea";
import Heading from "@/components/Heading";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      price: "",
    },
  });
  return (
    <div>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />{" "}
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default AddProductForm;
