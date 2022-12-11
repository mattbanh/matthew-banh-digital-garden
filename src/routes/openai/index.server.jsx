import {Layout} from '../../components/index.server';
import {Section} from '~/components';
import OpenAiClient from '../../components/sections/OpenAiClient.client';
// import {Configuration, OpenAIApi} from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export default function OpenAiServer() {
  return (
    <Layout>
      <Section>
        <OpenAiClient />
      </Section>
    </Layout>
  );
}
