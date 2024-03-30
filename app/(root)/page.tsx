import EventsList from "@/components/shared/EventsList";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/events.actions";
import { eventFormSchema } from "@/lib/validator";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-4xl font-bold">
              Host, Connect, Celebrate: Your Events, Our Platform
            </h1>
            <p className="text-xl md:text-2xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button asChild size="lg" className="button sm:w-fit">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>
          <Image
            src="/images/hero.png"
            alt="promo"
            width={1000}
            height={1000}
            className="max-h-[70vg] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="text-2xl font-bold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search CategoryFilter
        </div>

        <EventsList
          data={events?.data}
          noDataTitle="No Events Found"
          noDataSubtitle="Come back later"
          listType="All_Events"
          limit={6}
          page={1}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
