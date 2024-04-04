"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  //   useEffect(() => {
  //     const delayDebounceFn = setTimeout(() => {
  //       let newUrl = "";
  //       if (categories) {
  //         newUrl = `?${new URLSearchParams({
  //           category: categories,
  //         })}`;
  //       } else {
  //         newUrl = removeKeysFromQuery({
  //           params: searchParams.toString(),
  //           keysToRemove: ["category"],
  //         });
  //       }

  //       router.push(newUrl, { scroll: false });
  //     }, 500);

  //     return () => clearTimeout(delayDebounceFn);
  //   }, [categories, searchParams, router]);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "all") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Select
      value={searchParams.get("category") || undefined}
      onValueChange={onSelectCategory}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="select-item text-sm" value="all">
          All
        </SelectItem>

        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              className="select-item text-sm"
              key={category._id}
              value={category.name}
            >
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
