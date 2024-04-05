"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  urlParamName?: string;
  page: string | number;
  totalPages: number;
};

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handlePaginate = (btnType: "prev" | "next") => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex gap-2 my-7">
      <Button
        disabled={Number(page) <= 1}
        onClick={() => handlePaginate("prev")}
        variant="outline"
      >
        <Image src="/icons/prev.svg" alt="previous" width={20} height={20} />
      </Button>

      <Button
        disabled={Number(page) >= totalPages}
        onClick={() => handlePaginate("next")}
        variant="outline"
      >
        <Image src="/icons/next.svg" alt="next" width={20} height={20} />
      </Button>
    </div>
  );
};

export default Pagination;
