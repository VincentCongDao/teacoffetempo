"use client";

import CategoryInput from "@/components/(inputs)/categoryinput";
import CustomCheckBox from "@/components/(inputs)/customcheckbox";
import Input from "@/components/(inputs)/input";
import TextArea from "@/components/(inputs)/textarea";
import Heading from "@/components/Heading";
import Button from "@/components/button";
import { categories } from "@/utils/categories";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
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
  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data: ", data);

    // save product to mongodb
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    const productData = { ...data };
    console.log(productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Success");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something is wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full">
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
      <CustomCheckBox
        id="inStock"
        register={register}
        label="Product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Tea or Coffee</div>
        <div className="grid gird-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-4">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <Button
          label={isLoading ? "Loading..." : "Add Product"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default AddProductForm;
