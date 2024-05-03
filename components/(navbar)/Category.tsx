"use client";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }
      const updateQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = QueryString.stringify(
        {
          url: "/",
          query: updateQuery,
        },
        {
          skipNulls: true,
        }
      );
      router.push(url);
    }
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
      ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
