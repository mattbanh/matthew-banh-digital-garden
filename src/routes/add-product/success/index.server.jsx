import {Layout} from '../../../components/index.server';
import {Section, Success} from '../../../components/index';

// route which redirects to account page after successful submission of form
export default function SuccessPage() {
  return (
    <Layout>
      <div className="bg-garden-cream md:min-h-[1080px]">
        <Section>
          <Success />
        </Section>
      </div>
    </Layout>
  );
}
