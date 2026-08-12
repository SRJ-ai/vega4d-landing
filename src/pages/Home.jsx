import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { Environments } from '../components/Environments';
import { Applications } from '../components/Applications';
import { CapturePipeline } from '../components/CapturePipeline';
import { Instrument } from '../components/Instrument';
import { PrivacyValidation } from '../components/PrivacyValidation';
import { DataModalities } from '../components/DataModalities';
import { Datasets } from '../components/Datasets';
import { Coverage } from '../components/Coverage';
import { Integration } from '../components/Integration';
import { AccessTiers } from '../components/AccessTiers';
import { FAQ } from '../components/FAQ';
import { RequestAccess } from '../components/RequestAccess';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Environments />
      <Applications />
      <DataModalities />
      <CapturePipeline />
      <PrivacyValidation />
      <Instrument />
      <Datasets />
      <Coverage />
      <Integration />
      <AccessTiers />
      <FAQ />
      <RequestAccess />
    </main>
  );
}
