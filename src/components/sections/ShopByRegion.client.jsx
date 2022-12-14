import {Link, Image} from '@shopify/hydrogen';
// import {Section} from '../components/index';
import map from '../../assets/images/map-of-japan.png';

// SHOPBYREGION SECTION
export function ShopByRegion() {
  return (
    <section className="flex flex-col gap-8 max-w-[1440px] md:mx-auto md:flex-row md:pt-0 pb-[400px]">
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-center text-xl text-garden-cream font-bold mb-8 md:text-4xl md:mb-12">
          Shop by Region
        </h2>
        <p className="text-md text-garden-cream leading-7 mb-4">
          Japan is made up of four main islands and over 6,800 smaller islands.
          The four main islands are Hokkaido, Honshu, Shikoku, and Kyushu. Each
          of these islands has its own distinct regions and prefectures, which
          are similar to states or provinces. Some of the major regions in Japan
          include Tokyo, which is the capital and largest city, as well as other
          major cities like Osaka and Yokohama.
        </p>
        <p className="text-md text-garden-cream leading-7 mb-4">
          Click on the map to shop by region.
        </p>
      </div>
      <div className="shrink-0 md:w-1/2 flex flex-col justify-center">
        <div className="relative">
          <Image
            className="w-full object-contain"
            src={map}
            height={720}
            width={720}
            alt="interactive map of Japan"
          />
          <Link to="/regions/hokkaido">
            <div className=" group cursor-pointer rounded-full bg-garden-rose w-3 h-3 absolute top-[16%] left-[69%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute -top-1 left-[1.125rem] text-sm text-garden-cream font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Hokkaido
              </span>
            </div>
          </Link>
          <Link to="/regions/gifu">
            <div className=" group cursor-pointer rounded-full bg-garden-rose w-3 h-3 absolute top-[62.5%] left-[49%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute -top-1 left-[1.125rem] text-sm  text-garden-cream font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Gifu
              </span>
            </div>
          </Link>
          <Link to="/regions/hiroshima">
            <div className=" group cursor-pointer rounded-full bg-garden-rose w-3 h-3 absolute top-[72%] left-[28.5%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute -top-1 left-[1.125rem] text-sm text-garden-cream font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Hiroshima
              </span>
            </div>
          </Link>
          <Link to="/regions/aomori">
            <div className=" group cursor-pointer rounded-full bg-garden-rose w-3 h-3 absolute top-[33%] left-[63%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute -top-1 left-[1.125rem] text-sm text-garden-cream font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Aomori
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
