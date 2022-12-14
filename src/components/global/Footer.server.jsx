// FOOTER COMPONENT
// the demostore footer has fantastic styling including a Disclosure component from headlessui
// the Disclosure component may be used for a FAQ
// TO-DO: simplify footer to only contain relevant links

import {useUrl} from '@shopify/hydrogen';

import {Section} from '~/components';
// import {Section, Heading, FooterMenu, CountrySelector} from '~/components';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer({menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <>
      <div className="relative min-h-[25rem] z-50 "></div>
      <Section
        divider={isHome ? 'none' : 'top'}
        as="footer"
        role="contentinfo"
        className={`-z-10 fixed bottom-0 grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 
        border-b md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-garden-indigo  overflow-hidden`}
      >
        <div
          className={`self-end pt-8 text-garden-cream opacity-50 md:col-span-2 lg:col-span-${itemsCount} text-center`}
        >
          &copy; {new Date().getFullYear()} Digital Garden
        </div>
      </Section>
    </>
  );
}
