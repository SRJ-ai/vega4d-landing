import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { Environments } from '../components/Environments';
import { CapturePipeline } from '../components/CapturePipeline';
import { DataModalities } from '../components/DataModalities';
import { DataTrust } from '../components/DataTrust';
import { PrivacyValidation } from '../components/PrivacyValidation';
import { Applications } from '../components/Applications';
import { AccessTiers } from '../components/AccessTiers';
import { FAQ } from '../components/FAQ';
import { RequestAccess } from '../components/RequestAccess';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Environments />
      <CapturePipeline />
      <DataModalities />
      <DataTrust />
      <PrivacyValidation />
      <Applications />
      <AccessTiers />
      <FAQ />
      <RequestAccess />
    </main>
  );
}
