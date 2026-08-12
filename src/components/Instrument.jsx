import { Playback } from './canvas/Playback';
import { SectionHead } from './primitives/SectionHead';
import { instrument } from '../data/site';

/**
 * The page's centrepiece: a capture sequence the visitor can scrub.
 *
 * This is the proof section. Rather than claiming sub-millimeter tracking, it hands the
 * visitor the playback and lets them stop on any frame.
 */
export function Instrument() {
  return (
    <section id="instrument" className="u-rule relative overflow-hidden">
      <div className="u-guides" aria-hidden="true" />
      <div className="u-shell relative py-24 lg:py-32">
        <SectionHead title={instrument.heading} body={instrument.body} note={instrument.note} />

        <div className="mt-12">
          <Playback />
        </div>
      </div>
    </section>
  );
}
