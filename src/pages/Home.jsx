import { Hero } from '../components/Hero';
import { CapturePipeline } from '../components/CapturePipeline';
import { Instrument } from '../components/Instrument';
import { Datasets } from '../components/Datasets';
import { Coverage } from '../components/Coverage';
import { Integration } from '../components/Integration';
import { AccessTiers } from '../components/AccessTiers';
import { RequestAccess } from '../components/RequestAccess';

export default function Home() {
  return (
    <main>
      <Hero />
      <CapturePipeline />
      <Instrument />
      <Datasets />
      <Coverage />
      <Integration />
      <AccessTiers />
      <RequestAccess />
    </main>
  );
}
