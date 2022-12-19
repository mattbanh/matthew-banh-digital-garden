// Page to render events blog entries

import {useShopQuery, gql, Image} from '@shopify/hydrogen';

import {PageHeader, Section} from '~/components';
import {Layout, NotFound} from '~/components/index.server';
import {ATTR_LOADING_EAGER} from '~/lib/const';

const BLOG_HANDLE = 'events';

export default function Post({params}) {
  const {handle} = params;
  const {data} = useShopQuery({
    query: ARTICLE_QUERY,
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: handle,
    },
  });

  if (!data?.blog?.articleByHandle) {
    return <NotFound />;
  }

  const {title, publishedAt, contentHtml, author} = data.blog.articleByHandle;
  const formattedDate = new Intl.DateTimeFormat(`en-US`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <Layout>
      <div className="bg-garden-cream">
        <PageHeader heading={title} variant="blogPost">
          <span>
            {formattedDate} &middot; {author.name}
          </span>
        </PageHeader>
        {/* Section as article provided by Shopify demo */}
        <Section as="article" padding="x">
          {data.blog.articleByHandle.image && (
            <Image
              data={data.blog.articleByHandle.image}
              className="w-full mx-auto mt-8 md:mt-16 max-w-7xl"
              sizes="90vw"
              widths={[400, 800, 1200]}
              width="100px"
              loading={ATTR_LOADING_EAGER}
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
            />
          )}
          {/* dangerouslySetInnerHTML is used in place of "innerHTML" */}
          <div
            dangerouslySetInnerHTML={{__html: contentHtml}}
            className="article"
          />
        </Section>
      </div>
    </Layout>
  );
}

const ARTICLE_QUERY = gql`
  query ArticleDetails($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
      }
    }
  }
`;
