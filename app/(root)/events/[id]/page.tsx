import CheckoutButton from "@/components/shared/CheckoutButton";
import EventsList from "@/components/shared/EventsList";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/events.actions";
import { formatDateTime } from "@/lib/utils";
import { Event, SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetailsPage = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relaredEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:container">
          <Image
            src={event.imageUrl}
            alt="event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="font-bold text-xl bg-green-500/10 rounded-full px-5 py-2 text-green-700">
                    {event.isFree ? "Free" : `$${event.price}`}
                  </p>
                  <p className="text-base rounded-full font-medium bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="text-lg ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="text-base lg:text-xl flex flex-wrap items-center gap-2">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xl">
                <Image
                  src="/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="text-base lg:text-xl">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl text-grey-600">
                What You will learn
              </p>
              <p className="text-base lg:text-lg">{event.description}</p>
              <p className="text-base lg:text-lg truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="font-bold text-2xl">Events with the same Category</h2>

        <EventsList
          data={relaredEvents?.data}
          noDataTitle="No Events Found"
          noDataSubtitle="Come back later"
          listType="All_Events"
          limit={6}
          page={1}
          totalPages={relaredEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetailsPage;
