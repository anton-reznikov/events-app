import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/events.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

type UpdateEventProps = {
  params: {
    id: string;
  };
};
const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="wrapper bg-primary-50 bg-dotted-pattern bg-cover bg-center md:py-10">
        <h3 className="font-bold text-2xl text-left sm:text-center">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-5 ">
        <EventForm
          eventId={event._id}
          event={event}
          userId={userId}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;
