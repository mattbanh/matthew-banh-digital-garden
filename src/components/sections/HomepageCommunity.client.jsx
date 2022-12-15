import bottom from '../../assets/images/about-bottom.png';
import middle from '../../assets/images/about-mid.png';
import top from '../../assets/images/about-top.png';
import {Image, Link} from '@shopify/hydrogen';
import {Section} from '../index';

export function HomepageCommunity() {
  return (
    <section className="-mt-[240px] -mb-[240px] ">
      <div className="bg-garden-blue relative min-h-[1080px] rounded-[60px] md:min-h-[1920px]  md:rounded-[120px] lg:min-h-[2160px] lg:rounded-[160px] xl:min-h-[2560px] xl:rounded-[200px] flex items-center overflow-hidden">
        <Image
          className="absolute top-0"
          height={1440}
          width={2560}
          src={top}
          alt="community graphic"
        />
        <Section className="lg:mb-[240px]">
          <div className="flex flex-col-reverse md:flex-col lg:flex-row lg:justify-between md:gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl text-garden-turquoise font-bold mb-8 md:text-7xl">
                OUR COMMUNITY
              </h3>
              <p className="text-md text-garden-turquoise leading-7 mb-4">
                We believe to have communities is essential for human being.
                That’s why we care about our community, and trying to make it a
                place for everyone.
              </p>
              <p className="text-md text-garden-turquoise leading-7 mb-4">
                Our partners always have very inclusive and welcoming events
                everywhere in Japan.
              </p>
              <p className="text-md text-garden-turquoise leading-7 mb-20">
                Feel free to join any of our gathering. We are excited to see
                you there!
              </p>
              <div className="flex justify-center items-end md:min-w-[25%] md:items-center">
                <Link
                  className="relative group overflow-hidden rounded-full box-content border-2 border-garden-turquoise h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
                  to="/events"
                >
                  <div className="bg-garden-turquoise rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
                  <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-turquoise group-hover:text-garden-blue transition ease-in-out duration-500">
                    SEE EVENTS
                  </span>
                </Link>
              </div>
            </div>
            <div className="p-12">
              <Image
                height={480}
                width={480}
                src={middle}
                alt="community graphic"
              />
            </div>
          </div>
        </Section>
        <Image
          className="absolute bottom-0"
          height={1440}
          width={2560}
          src={bottom}
          alt="community graphic"
        />
      </div>
    </section>
  );
}
