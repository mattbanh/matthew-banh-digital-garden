// Homepage Hero section
import {Link} from '@shopify/hydrogen';

import heroImg from '../../assets/images/homepage-hero.png';
import {Section} from '../index';

export function HomepageHero() {
  return (
    <div
      className=" bg-cover min-h-[600px] md:min-h-[1280px] flex items-center"
      style={{backgroundImage: `url(${heroImg})`}}
    >
      <Section>
        <h2 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
          WELCOME TO DIGITAL GARDEN
        </h2>
        <h2 className="text-lg text-garden-cream font-bold mb-8 md:text-2xl">
          TOGETHER LET&apos;S SUPPORT RURAL MAKERS AND PRODUCERS
        </h2>
        <Link
          className="relative group overflow-hidden rounded-full box-content border-2 border-garden-cream h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
          to="/products"
        >
          <div className="bg-garden-cream rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
          <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-cream group-hover:text-garden-grey transition ease-in-out duration-500">
            SHOP NOW
          </span>
        </Link>
      </Section>
    </div>
  );
}
