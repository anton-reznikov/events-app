import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  const { userId } = sessionClaims?.userId as { userId: string };

  const isEventCreator = userId === event.organizer._id.toString();
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl md:min-h-[438px]">
      <Link
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        href={`/events/${event?._id}}`}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <Link
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        href={`/events/${event?._id}}`}
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="text-sm font-semibold w-min rounded-full bg-green-100 px-4 py-1 text-grey-600">
              {event.isFree ? "Free" : `$${event.price}`}
            </span>
            <p className="text-sm font-semibold w-min rounded-full px-4 py-1 bg-grey-500/10 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="text-base font-medium text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className="text-base md:text-xl line-clamp-2 flex-1 text-black">
          {event.title}
        </p>

        <div className="flex-between w-full">
          <p className="text-sm md:text-base text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link className="flex gap-2" href={`/orders?eventId=${event._id}`}>
              <p className="text-primary-500">Order details</p>
              <Image
                src="/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
