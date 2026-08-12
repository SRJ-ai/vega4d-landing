/*
  Single source for every visible string and figure on the page.
  Nothing is inlined in JSX, so copy and specs can be edited without touching layout.

  =======================================================================
  PLACEHOLDER - replace with real figures before this site goes public.
  =======================================================================
  Vega4D has no published capture volumes, dataset sizes, coverage tables, or
  benchmark results on record. Every number below is illustrative scaffolding so the
  layout can be judged at real density. Each block that renders invented figures also
  renders a visible "illustrative" note in the UI, and those notes must stay until the
  numbers are real. Do not add customer names, partner logos, or benchmark deltas here
  without a source.
*/

export const brand = {
  name: 'Vega4D',
  // One label per intent. Every contact-intent control on the page uses this string.
  primaryCta: 'Request access',
};

export const nav = [
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Instrument', href: '#instrument' },
  { label: 'Datasets', href: '#datasets' },
  { label: 'Access', href: '#access' },
];

export const hero = {
  headline: ['Robotic dexterity,', 'perfected.'],
  subtext:
    'Sub-millimeter human manipulation data, captured on our own rig and shipped as training-ready tensors. We also collect data and prepare custom datasets for various trainings.',
  secondaryCta: { label: 'Read the spec sheet', href: '#datasets' },
  // Readouts drawn beside the hero canvas. Live values come from the renderer, not from here.
  instrumentLabel: 'Hand kinematics, 21 keypoints',
};

export const pipeline = {
  heading: 'From a hand in the volume to a tensor on your disk.',
  body: 'Four stages, all of them ours. Nothing scraped, nothing synthesised, nothing licensed in from a third party.',
  stages: [
    {
      key: 'capture',
      title: 'Capture',
      body: 'Twelve calibrated cameras and an instrumented glove record one pair of hands doing real work. Depth, RGB, joint encoders, and tactile pressure land on the same clock.',
      spec: [
        ['Cameras', '12'],
        ['Sync drift', '< 0.4 ms'],
        ['Capture rate', '240 fps'],
      ],
    },
    {
      key: 'vectorize',
      title: 'Vectorize',
      body: 'Frames resolve into a 21-keypoint skeleton per hand with per-joint rotation. Contact events are labelled where pressure crosses threshold, not where a human guessed.',
      spec: [
        ['Keypoints', '21 / hand'],
        ['Rotation', '6-DoF'],
        ['Contact labels', 'Pressure-derived'],
      ],
    },
    {
      key: 'validate',
      title: 'Validate',
      body: 'Every sequence is replayed against the source footage. Sequences that drift past tolerance are cut, not corrected, so nothing interpolated reaches a training run.',
      spec: [
        ['Tolerance', '0.8 mm'],
        ['Replay coverage', '100%'],
        ['Rejected', '6.3%'],
      ],
    },
    {
      key: 'ship',
      title: 'Ship',
      body: 'Sequences pack into sharded tensors with a stable schema, a per-shard checksum, and the raw footage available on request for anything you want to re-derive yourself.',
      spec: [
        ['Format', 'Sharded / WebDataset'],
        ['Schema', 'Versioned'],
        ['Raw footage', 'On request'],
      ],
    },
  ],
};

export const instrument = {
  heading: 'Scrub a capture, joint by joint.',
  body: 'This is one two-second grasp from a validation set, replayed in the browser at the fidelity we ship. Drag the timeline.',
  note: 'Synthetic sample render. Production sequences ship as tensors, not as animation.',
  // Which joints are reported lives in src/lib/hand.js, beside the kinematics that drive them.
};

export const datasets = {
  heading: 'Three sets, priced by what you are training.',
  note: 'Figures below are illustrative sample values, not published results.',
  items: [
    {
      id: 'DEX-1M',
      title: 'Bimanual dexterity',
      body: 'Two hands, one object, sustained contact. Assembly, unscrewing, threading, and the recoveries when a grip slips.',
      figures: [
        ['Frames', '1.24 M'],
        ['Hours', '412'],
        ['Subjects', '38'],
      ],
      modalities: ['RGB stereo', 'Depth', 'Joint encoders', 'Tactile'],
      license: 'Research and commercial, per-seat',
      feature: true,
    },
    {
      id: 'TOOL-320K',
      title: 'Hand tool manipulation',
      body: 'Pliers, drivers, shears, and knives held the way people actually hold them under load.',
      figures: [
        ['Frames', '318 K'],
        ['Hours', '106'],
        ['Subjects', '21'],
      ],
      modalities: ['RGB stereo', 'Depth', 'Tactile'],
      license: 'Research and commercial, per-seat',
    },
    {
      id: 'REACH-2M',
      title: 'Reach and grasp primitives',
      body: 'Short isolated approaches to 140 objects, indexed by grasp taxonomy for curriculum training.',
      figures: [
        ['Frames', '2.07 M'],
        ['Hours', '689'],
        ['Subjects', '54'],
      ],
      modalities: ['RGB stereo', 'Depth', 'IMU'],
      license: 'Research, non-exclusive',
    },
  ],
};

export const coverage = {
  heading: 'What each stream actually carries.',
  body: 'Sample rate and resolution per modality, per set. Empty means the stream is not in that set, not that it is coming later.',
  note: 'Illustrative values.',
  columns: ['DEX-1M', 'TOOL-320K', 'REACH-2M'],
  rows: [
    { modality: 'RGB stereo', values: ['240 fps / 4K', '240 fps / 4K', '120 fps / 2K'] },
    { modality: 'Depth', values: ['120 fps / 1.2 MP', '120 fps / 1.2 MP', '60 fps / 1.2 MP'] },
    { modality: 'Joint encoders', values: ['1 kHz / 20 ch', '1 kHz / 20 ch', null] },
    { modality: 'Tactile pressure', values: ['500 Hz / 64 ch', '500 Hz / 64 ch', null] },
    { modality: 'Wrist IMU', values: ['800 Hz', '800 Hz', '800 Hz'] },
    { modality: 'Audio', values: ['48 kHz', null, null] },
  ],
};

export const integration = {
  heading: 'Loaded in four lines.',
  body: 'Access is an API key and a shard index. The loader streams shards, so you are training before the download finishes.',
  tabs: [
    {
      key: 'python',
      label: 'Python',
      code: `from vega4d import Sequences

seqs = Sequences.open("DEX-1M", split="train", stream=True)
for batch in seqs.batches(size=64, modalities=["rgb", "depth", "joints"]):
    model.step(batch.frames, batch.joint_rotations)`,
    },
    {
      key: 'curl',
      label: 'cURL',
      code: `curl -H "Authorization: Bearer $VEGA4D_KEY" \\
  "https://api.vega4d.com/v1/sets/DEX-1M/shards?split=train" \\
  | jq '.shards[0]'`,
    },
    {
      key: 'typescript',
      label: 'TypeScript',
      code: `import { openSet } from "@vega4d/client";

const set = await openSet("DEX-1M", { split: "train", stream: true });
for await (const shard of set.shards()) {
  await index.write(shard.sequences);
}`,
    },
  ],
  note: 'Endpoint and package names are placeholders until the API ships.',
};

export const tiers = {
  heading: 'Access, three ways.',
  body: 'Terms are quoted against the set and the seat count. We do not publish a price we would then negotiate.',
  items: [
    {
      name: 'Research',
      who: 'Named academic groups and non-commercial labs',
      includes: ['One set, one split', 'Citation licence', 'Shared support queue'],
      terms: 'Terms on request',
    },
    {
      name: 'Lab',
      who: 'Industrial research teams training in-house models',
      includes: ['All sets, all splits', 'Commercial licence, per seat', 'Raw footage on request'],
      terms: 'Terms on request',
    },
    {
      name: 'Enterprise',
      who: 'Teams that need capture built to their own task list',
      includes: ['Commissioned capture', 'Schema extensions', 'Dedicated capture window'],
      terms: 'Terms on request',
    },
  ],
};

export const faq = {
  heading: 'Frequently asked questions.',
  items: [
    {
      q: 'Do you offer custom data collection?',
      a: 'Yes. If your model requires specific tasks, tools, or objects, we can run dedicated capture sessions on our rig. This is available on our Enterprise tier.'
    },
    {
      q: 'What is the licensing model?',
      a: 'Research access is granted on a non-commercial, citation basis. Lab and Enterprise tiers receive commercial, per-seat licenses for training proprietary models.'
    },
    {
      q: 'Can I access the raw footage?',
      a: 'The raw synchronized RGB and depth feeds are available on request for Lab and Enterprise customers who wish to re-derive keypoints or run custom computer vision pipelines.'
    },
    {
      q: 'How do you handle drift and validation?',
      a: 'Every captured sequence is automatically replayed against the source video. If the computed skeleton drifts more than 0.8mm from ground truth, the sequence is rejected.'
    }
  ]
};

export const access = {
  heading: 'Tell us what you are training.',
  body: 'One engineer reads every request. If your task is outside what we capture today, we will say so rather than sell you the nearest set. We also collect data and prepare custom datasets for various specific training requirements.',
  expect: [
    'A reply within two working days',
    'A sample shard and the schema, before any contract',
    'No sales sequence',
  ],
  fields: {
    firstName: { label: 'First name', placeholder: 'Priya' },
    lastName: { label: 'Last name', placeholder: 'Raghunathan' },
    email: { label: 'Work email', placeholder: 'priya@lab.example' },
    message: {
      label: 'What are you training?',
      placeholder: 'Bimanual policy for cable routing. Need contact labels and joint rotations.',
      help: 'Task, model family, and which modalities you need. A couple of sentences is enough.',
    },
  },
  success: {
    title: 'Request logged.',
    body: 'An engineer will reply to your work email within two working days with a sample shard and the schema.',
  },
};

export const footer = {
  links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/privacy' },
  ],
  legal: 'Figures shown on this page are illustrative until published.',
};
