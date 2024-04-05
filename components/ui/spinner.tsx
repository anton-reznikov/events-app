import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <section className="wrapper">
      <div className="flex w-full justify-center items-center">
        <Image
          src="/icons/spinner.svg"
          alt="spinner"
          width={150}
          height={150}
        />
        <p className="text-lg font-extralight">Loading...</p>
      </div>
    </section>
  );
};

export default Spinner;
