// Homepage About Section

import earth from '../../assets/images/earth.png';
import {Image} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function HomepageAbout() {
  // Quick way to use scroll effect to make an element rotate
  // Should be re-written to not include getElementById(ex. useRef)
  useEffect(() => {
    document.onscroll = function () {
      var theta = (document.documentElement.scrollTop / 500) % Math.PI;
      if (document.getElementById('rotating-earth')) {
        document.getElementById('rotating-earth').style.transform =
          'rotate(' + theta + 'rad)';
      }
    };
  });

  return (
    <>
      <div className="w-full py-16 min-h-full md:py-48 lg:min-h-[2560px]  lg:flex lg:justify-between lg:py-72 lg:max-w-[1440px] lg:mx-auto">
        <div className="lg:w-1/3 md:flex md:flex-col md:justify-between">
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              WHY DIGITAL GARDEN
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Visiting Digital Garden is a great way to shop for unique and
              high-quality products. All of the items are carefully selected and
              are of the highest standards. In addition, by supporting my store,
              you are helping to support small business and the local economy.
            </p>
          </div>
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              WHAT DO WE DO
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Digital Garden is a unique platform that offers curated products
              produced by local farmers and makers in rural regions of Japan. By
              offering a direct-to-consumer sales platform, Digital Garden is
              helping to support the rural revitalization of Japan by providing
              a way for rural producers to sell their goods. This is a great way
              to support small local farmers and to help preserve the
              traditional agricultural practices of Japan. Our focus on
              sustainability and supporting rural communities makes it a
              valuable resource for anyone looking to purchase high-quality,
              locally-sourced products.
            </p>
          </div>
        </div>
        <div className="md:w-1/3 md:p-8 invisible lg:visible">
          <div className="md:sticky top-1/3 text-center">
            <Image
              className="hidden lg:block"
              width={360}
              height={360}
              src={earth}
              id="rotating-earth"
              alt="rotating earth"
            />
          </div>
        </div>
        <div className="lg:w-1/3 md:flex md:flex-col md:justify-center">
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              WHY EAT ORGANIC
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Eating organic can have numerous health benefits. Organic foods
              are grown without the use of synthetic pesticides and fertilizers,
              which can be harmful to our bodies. In addition, organic farming
              practices are better for the environment, as they rely on
              sustainable methods to produce food. As a result, organic foods
              are often more nutritious and taste better than conventionally
              grown foods. Furthermore, by choosing organic, you can support
              small local farmers and help to build a more sustainable food
              system. Overall, there are many good reasons to incorporate
              organic foods into your diet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
