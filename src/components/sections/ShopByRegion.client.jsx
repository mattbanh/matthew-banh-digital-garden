import {Link, Image} from '@shopify/hydrogen';
// import {Section} from '../components/index';
import map from '../../assets/images/map-of-japan.png';

// SHOPBYREGION SECTION
export function ShopByRegion() {
  return (
    // <Section>
    <section className="flex flex-col gap-8 md:flex-row">
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-center text-xl font-bold mb-8 md:text-4xl md:mb-12">
          Shop by Region
        </h2>
        <p className="text-sm leading-7 mb-4">
          Japan is made up of four main islands and over 6,800 smaller islands.
          The four main islands are Hokkaido, Honshu, Shikoku, and Kyushu. Each
          of these islands has its own distinct regions and prefectures, which
          are similar to states or provinces. Some of the major regions in Japan
          include Tokyo, which is the capital and largest city, as well as other
          major cities like Osaka and Yokohama.
        </p>
        <p className="text-sm leading-7 mb-4">
          Click on the map to shop by region.
        </p>
      </div>
      <div className="relative shrink-0 md:w-1/2 flex align-middle">
        <Image
          className="cursor-pointer w-full"
          src={map}
          height={720}
          width={720}
          alt="interactive map of Japan"
        />
        <Link to="/regions/hokkaido">
          <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[16%] left-[69%] hover:bg-white">
            <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
              Hokkaido
            </span>
          </div>
        </Link>
        <Link to="/regions/gifu">
          <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[62.5%] left-[49%] hover:bg-white">
            <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
              Gifu
            </span>
          </div>
        </Link>
        <Link to="/regions/hiroshima">
          <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[72%] left-[28.5%] hover:bg-white">
            <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
              Hiroshima
            </span>
          </div>
        </Link>
        <Link to="/regions/aomori">
          <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[33%] left-[63%] hover:bg-white">
            <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
              Aomori
            </span>
          </div>
        </Link>
      </div>
    </section>
    // </Section>
  );
}
