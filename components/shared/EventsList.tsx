import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";

type CollectionProps = {
  data: IEvent[];
  noDataTitle: string;
  noDataSubtitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  listType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const EventsList = ({
  data,
  noDataTitle,
  noDataSubtitle,
  limit,
  page,
  listType,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = listType === "Events_Organized";
              const hidePrice = listType === "My_Tickets";
              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="text-xl font-bold md:text-2xl">{noDataTitle}</h3>
          <p className="text-sm">{noDataSubtitle}</p>
        </div>
      )}
    </>
  );
};

export default EventsList;
