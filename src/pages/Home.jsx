import { Hero } from '../components/Hero';
import { RigStrip } from '../components/RigStrip';
import { Environments } from '../components/Environments';
import { CapturePipeline } from '../components/CapturePipeline';
import { DataModalities } from '../components/DataModalities';
import { Instrument } from '../components/Instrument';
import { DataTrust } from '../components/DataTrust';
import { PrivacyValidation } from '../components/PrivacyValidation';
import { ComparisonTable } from '../components/ComparisonTable';
import { Applications } from '../components/Applications';
import { Integration } from '../components/Integration';
import { AccessTiers } from '../components/AccessTiers';
import { FAQ } from '../components/FAQ';
import { RequestAccess } from '../components/RequestAccess';

export default function Home() {
  return (
    <main>
      <Hero />
      <RigStrip />
      <Environments />
      <CapturePipeline />
      <DataModalities />
      <Instrument />
      <DataTrust />
      <PrivacyValidation />
      <ComparisonTable />
      <Applications />
      <Integration />
      <AccessTiers />
      <FAQ />
      <RequestAccess />
    </main>
  );
}
