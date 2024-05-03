"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import QueryString from "qs";
const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      return router.push("/");
    }
    const url = QueryString.stringify(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNulls: true }
    );
    router.push(url);
    reset();
  };
  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        placeholder="Search your drink...Tea or Coffee"
        autoComplete="off"
        type="text"
        className="p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-200 hover:opacity-80 text-white p-2 roudned-r-md"
      />
    </div>
  );
};

export default SearchBar;
