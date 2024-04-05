import EventsList from "@/components/shared/EventsList";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/events.actions";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="text-lg font-bold text-center sm:text-left">
            My Tickets
          </h3>
          <Button size="lg" asChild className="button hidden sm:flex">
            <Link href="/#events">Explore more events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <EventsList
          data={orderedEvents}
          noDataTitle="Events tickets have bought yet"
          noDataSubtitle="Start browse the events"
          listType="My_Tickets"
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="text-lg font-bold text-center sm:text-left">
            Events organized
          </h3>
          <Button size="lg" asChild className="button hidden sm:flex">
            <Link href="/events/create">Create new event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <EventsList
          data={organizedEvents?.data}
          noDataTitle="No events have been created yet"
          noDataSubtitle="Create a new one"
          listType="Events_Organized"
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
