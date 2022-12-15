import {Link, Image} from '@shopify/hydrogen';
// import {Section} from '../components/index';
import map from '../../assets/images/map-of-japan.png';

// SHOPBYREGION SECTION
export function ShopByRegion() {
  return (
    <section className="flex flex-col gap-8 max-w-[1440px] md:mx-auto md:flex-row pb-[400px] pt-[100px] md:pt-[200px]">
      <div className="md:w-1/2 flex flex-col justify-center">
        <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
          SHOP BY REGION
        </h3>
        <p className="text-md text-garden-cream leading-7 mb-4">
          Japan is made up of four main islands and over 6,800 smaller islands.
          The four main islands are Hokkaido, Honshu, Shikoku, and Kyushu. Each
          of these islands has its own distinct regions and prefectures, which
          are similar to states or provinces. Some of the major regions in Japan
          include Tokyo, which is the capital and largest city, as well as other
          major cities like Osaka and Yokohama.
        </p>
        <p className="text-md text-garden-cream leading-7 mb-12">
          Click on the map to shop by region.
        </p>

        <Link
          className="relative group overflow-hidden rounded-full box-content border-2 border-garden-cream h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
          to="/regions"
        >
          <div className="bg-garden-cream rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
          <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-cream group-hover:text-garden-grey transition ease-in-out duration-500">
            VIEW ALL REGIONS
          </span>
        </Link>
      </div>
      <div className="shrink-0 md:w-1/2 flex flex-col justify-center">
        <div className="relative">
          <Image
            className="w-full object-contain p-5"
            src={map}
            height={720}
            width={720}
            alt="interactive map of Japan"
          />
          <Link to="/regions/hokkaido">
            <div className=" group cursor-pointer rounded-full bg-garden-yellow w-3 h-3 absolute top-[17%] left-[68%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute block px-3 py-1 rounded-[20px] bg-garden-cream -top-2 left-[1.125rem] text-sm text-garden-grey font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Hokkaido
              </span>
            </div>
          </Link>
          <Link to="/regions/gifu">
            <div className=" group cursor-pointer rounded-full bg-garden-yellow w-3 h-3 absolute top-[64%] left-[45%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute block px-3 py-1 rounded-[20px] bg-garden-cream -top-2 left-[1.125rem] text-sm text-garden-grey font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Gifu
              </span>
            </div>
          </Link>
          <Link to="/regions/hiroshima">
            <div className=" group cursor-pointer rounded-full bg-garden-yellow w-3 h-3 absolute top-[73%] left-[19%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute block px-3 py-1 rounded-[20px] bg-garden-cream -top-2 left-[1.125rem] text-sm text-garden-grey font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Hiroshima
              </span>
            </div>
          </Link>
          <Link to="/regions/aomori">
            <div className=" group cursor-pointer rounded-full bg-garden-yellow w-3 h-3 absolute top-[35%] left-[59%] hover:bg-garden-cream ease-in-out duration-200">
              <span className="absolute block px-3 py-1 rounded-[20px] bg-garden-cream -top-2 left-[1.125rem] text-sm text-garden-grey font-bold invisible opacity-0 -translate-x-1/4 group-hover:visible group-hover:opacity-100  group-hover:translate-x-0 duration-300 ">
                Aomori
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
