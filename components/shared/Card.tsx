import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import React from "react";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl md:min-h-[438px]">
      <Link
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        href={`/events/${event?._id}}`}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />

      <Link
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        href={`/events/${event?._id}}`}
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="text-sm font-semibold w-min rounded-full bg-green-100 px-4 py-1 text-grey-600">
              {event.isFree ? "Free" : `$${event.price}`}
            </span>
            <p className="text-sm font-semibold w-min rounded-full px-4 py-1 bg-grey-500/10 text-grey-500">
              {event.category.name}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Card;
