/*
  A 21-keypoint hand model in the MediaPipe index order, posed by forward kinematics.

  Index order: 0 wrist, 1-4 thumb, 5-8 index, 9-12 middle, 13-16 ring, 17-20 pinky.
  Each finger contributes four points: the knuckle plus three phalange joints.

  Coordinates are normalized around the palm centre: x right, y up, z toward the viewer.
  Both the hero renderer and the scrub playback read from here, so a change to the
  skeleton shows up in every rendering of it.
*/

const TAU = Math.PI * 2;

/*
  The hand is seen from the back with the fingers pointing up.

  base   knuckle position in the palm plane
  fan    lateral angle from vertical, so the fingers splay slightly when open
  lens   phalange lengths, proximal to distal
  bend   share of the grasp each joint takes
  depth  resting offset toward the viewer, which keeps the pinky behind the index

  Curling happens in the vertical plane rather than the palm plane: each joint rotates the
  remaining chain toward the viewer, so a closing hand foreshortens and the tips come back
  down toward the palm. Rotating inside the palm plane instead is what makes a rigged hand
  read as a fan of sticks.
*/
const FINGERS = [
  {
    name: 'thumb',
    base: [-0.38, -0.26],
    fan: -1.02,
    lens: [0.23, 0.18, 0.15],
    bend: [0.62, 0.72, 0.52],
    depth: 0.5,
  },
  {
    name: 'index',
    base: [-0.23, 0.06],
    fan: -0.15,
    lens: [0.31, 0.21, 0.14],
    bend: [0.95, 1.15, 0.85],
    depth: 0.18,
  },
  {
    name: 'middle',
    base: [-0.02, 0.13],
    fan: -0.02,
    lens: [0.33, 0.23, 0.15],
    bend: [1.0, 1.2, 0.9],
    depth: 0.02,
  },
  {
    name: 'ring',
    base: [0.18, 0.09],
    fan: 0.12,
    lens: [0.3, 0.21, 0.14],
    bend: [0.98, 1.15, 0.88],
    depth: -0.14,
  },
  {
    name: 'pinky',
    base: [0.34, -0.02],
    fan: 0.26,
    lens: [0.23, 0.16, 0.11],
    bend: [0.9, 1.05, 0.8],
    depth: -0.3,
  },
];

// Radians of bend per unit of joint share at full closure. Three joints at this gain put a
// fingertip just past vertical, which is where a loaded grip actually sits.
const BEND_GAIN = 0.46;

export const WRIST = [0.0, -0.44];

// Bone pairs by keypoint index, for drawing the skeleton.
export const BONES = (() => {
  const bones = [];
  FINGERS.forEach((_, f) => {
    const first = 1 + f * 4;
    bones.push([0, first]);
    for (let j = 0; j < 3; j += 1) bones.push([first + j, first + j + 1]);
  });
  // Palm arch across the knuckles keeps the hand from reading as five loose sticks.
  bones.push([1, 5], [5, 9], [9, 13], [13, 17]);
  return bones;
})();

export const FINGER_TIPS = [4, 8, 12, 16, 20];

/**
 * Pose the hand at a point in a grasp cycle.
 * @param {number} phase 0 to 1. 0 is open, 0.5 is closed on the object, 1 is open again.
 * @returns {{points: Array<{x:number,y:number,z:number}>, closure: number}}
 */
export function poseAt(phase) {
  // Asymmetric close and release: hands shut faster than they open.
  const p = ((phase % 1) + 1) % 1;
  const closure = p < 0.45 ? ease(p / 0.45) : 1 - ease((p - 0.45) / 0.55);

  const points = [{ x: WRIST[0], y: WRIST[1], z: 0 }];

  for (const finger of FINGERS) {
    let [x, y] = finger.base;
    let z = finger.depth * 0.25;

    // Open hands splay; closing hands draw the fingers together.
    const fan = finger.fan * (0.55 + 0.45 * (1 - closure));
    const dirX = Math.sin(fan);
    const dirY = Math.cos(fan);

    points.push({ x, y, z });

    let bend = 0;
    for (let j = 0; j < 3; j += 1) {
      bend += closure * finger.bend[j] * BEND_GAIN;
      const len = finger.lens[j];
      const inPlane = Math.cos(bend) * len;
      x += dirX * inPlane;
      y += dirY * inPlane;
      // Out-of-plane travel is what the depth camera sees, and it drives point size.
      z += Math.sin(bend) * len * 1.5 + finger.depth * 0.06;
      points.push({ x, y, z });
    }
  }

  return { points, closure };
}

/** Contact reads true while the grasp is loaded, which is what the tactile stream labels. */
export function contactAt(phase) {
  const p = ((phase % 1) + 1) % 1;
  return p > 0.32 && p < 0.62;
}

const BY_NAME = Object.fromEntries(FINGERS.map((f) => [f.name, f]));

/*
  Joints the playback can report, as [label, finger, joint index].
  The model owns this list: a readout only exists for a joint the kinematics actually drive.
*/
export const READOUTS = [
  ['Thumb IP', 'thumb', 2],
  ['Index PIP', 'index', 1],
  ['Middle PIP', 'middle', 1],
  ['Ring PIP', 'ring', 1],
];

/**
 * Flexion of one joint in degrees, where 0 is a straight finger.
 *
 * Read from the kinematics rather than measured off the projected points: the bend happens
 * out of the palm plane, so a 2D angle between the drawn bones stays near 180 the whole way
 * through a grasp and tells the reader nothing.
 */
export function flexionDeg(closure, fingerName, jointIndex) {
  const finger = BY_NAME[fingerName];
  if (!finger) return 0;
  return (closure * finger.bend[jointIndex] * BEND_GAIN * 180) / Math.PI;
}

function ease(t) {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export { TAU };
