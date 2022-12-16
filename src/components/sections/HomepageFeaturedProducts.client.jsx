// Homepage Featured products Section

import {FeaturedProducts} from '../index';

export function HomepageFeaturedProducts({data, featuredTop, featuredBottom}) {
  const {topFeature, bottomFeature} = data;

  return (
    <div className="pb-[240px] pt-16 lg:max-w-[1440px]">
      <h2 className="text-3xl text-garden-grey font-bold md:mb-16 md:text-7xl">
        TRENDING THIS WEEK
      </h2>
      <FeaturedProducts
        products={topFeature.products.nodes}
        featuredType={featuredTop}
      />
      <FeaturedProducts
        products={bottomFeature.products.nodes}
        featuredType={featuredBottom}
      />
    </div>
  );
}
