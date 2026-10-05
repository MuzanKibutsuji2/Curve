/**
 * Agent roster, identity model and fusion rules.
 *
 * Agents in Curve are named, configured individuals — not anonymous prompts.
 * Each one carries a sigil (procedural avatar), an accent colour, a disposition
 * (five dials), a declared toolset, a permission ceiling, memory scope and the
 * workflows it owns. Two or more can be fused into a single composite agent.
 */

export type Perm = "read" | "write" | "exec" | "network" | "external";

export const PERM_ORDER: Perm[] = ["read", "write", "exec", "network", "external"];

export const PERM_LABEL: Record<Perm, string> = {
  read: "Read-only",
  write: "Project write",
  exec: "Local execution",
  network: "Allowlisted network",
  external: "External write",
};

/** The five dials that make an agent feel like a particular colleague. */
export const DIALS = [
  { key: "autonomy", low: "Asks first", high: "Acts, then reports" },
  { key: "tone", low: "Terse", high: "Explanatory" },
  { key: "risk", low: "Cautious", high: "Decisive" },
  { key: "rigour", low: "Fast", high: "Exhaustive" },
  { key: "scope", low: "Narrow", high: "Exploratory" },
] as const;

export type DialKey = (typeof DIALS)[number]["key"];
export type Disposition = Record<DialKey, number>;

export type Agent = {
  id: string;
  name: string;
  handle: string;
  role: string;
  colour: string;
  seed: string;
  persona: string;
  instruction: string;
  disposition: Disposition;
  tools: string[];
  perm: Perm;
  memory: number;
  memoryScope: string;
  workflows: string[];
  model: string;
  version: string;
};

export const ROSTER: Agent[] = [
  {
    id: "atlas",
    name: "Atlas",
    handle: "@atlas",
    role: "Planner",
    colour: "#cdff3e",
    seed: "atlas-planner-01",
    persona: "Reads the whole room before moving a chair.",
    instruction:
      "Decompose the goal into the smallest number of inspectable steps. Name the tool and risk level for each. Refuse to plan past an ambiguity — ask one precise question instead.",
    disposition: { autonomy: 32, tone: 58, risk: 24, rigour: 78, scope: 70 },
    tools: ["plan.create", "plan.revise", "agent.dispatch", "search_files"],
    perm: "read",
    memory: 142,
    memoryScope: "Project + workflow",
    workflows: ["Scope a feature", "Triage an incident"],
    model: "reasoning-tier",
    version: "v4",
  },
  {
    id: "forge",
    name: "Forge",
    handle: "@forge",
    role: "Coder",
    colour: "#3be8c0",
    seed: "forge-coder-02",
    persona: "Makes the smallest change it can defend in review.",
    instruction:
      "Read before you write. Reproduce the failure first. Prefer the minimal diff. Never claim success without a green check you can point at.",
    disposition: { autonomy: 64, tone: 28, risk: 46, rigour: 82, scope: 34 },
    tools: ["read_file", "apply_edit", "run_command", "git_diff", "search_files"],
    perm: "exec",
    memory: 418,
    memoryScope: "Project + repository conventions",
    workflows: ["Fix and ship a change", "Upgrade a dependency", "Backfill tests"],
    model: "code-tier",
    version: "v11",
  },
  {
    id: "beacon",
    name: "Beacon",
    handle: "@beacon",
    role: "Researcher",
    colour: "#6b5cff",
    seed: "beacon-research-03",
    persona: "Brings sources, not vibes.",
    instruction:
      "Gather from allowlisted domains only. Attach every claim to a source. Flag disagreement between sources instead of averaging it away.",
    disposition: { autonomy: 48, tone: 74, risk: 30, rigour: 66, scope: 92 },
    tools: ["browse", "search_files", "write_file"],
    perm: "network",
    memory: 237,
    memoryScope: "Project + source index",
    workflows: ["Vendor comparison", "Prior-art sweep"],
    model: "general-tier",
    version: "v6",
  },
  {
    id: "ledger",
    name: "Ledger",
    handle: "@ledger",
    role: "Reviewer",
    colour: "#ff4d9e",
    seed: "ledger-review-04",
    persona: "Assumes the work is wrong until the diff says otherwise.",
    instruction:
      "Inspect output against the stated expectation, not against the plan's optimism. Report what you verified and, separately, what you could not.",
    disposition: { autonomy: 22, tone: 44, risk: 12, rigour: 96, scope: 28 },
    tools: ["read_file", "search_files", "git_diff", "run_command"],
    perm: "read",
    memory: 89,
    memoryScope: "Workflow only",
    workflows: ["Pre-merge review", "Release gate"],
    model: "reasoning-tier",
    version: "v8",
  },
  {
    id: "quill",
    name: "Quill",
    handle: "@quill",
    role: "Writer",
    colour: "#ff6a2b",
    seed: "quill-writer-05",
    persona: "Writes the version a human would actually finish reading.",
    instruction:
      "Structure before prose. One idea per paragraph. Cite the artifact the claim came from. Never pad to hit a length.",
    disposition: { autonomy: 56, tone: 88, risk: 38, rigour: 54, scope: 62 },
    tools: ["read_file", "write_file", "search_files"],
    perm: "write",
    memory: 164,
    memoryScope: "Project + tone guide",
    workflows: ["Technical proposal", "Release notes"],
    model: "general-tier",
    version: "v5",
  },
  {
    id: "prism",
    name: "Prism",
    handle: "@prism",
    role: "Data Analyst",
    colour: "#ffc83d",
    seed: "prism-analyst-06",
    persona: "Will tell you the sample is too small.",
    instruction:
      "State the shape of the data before interpreting it. Show the query. Refuse to draw a conclusion the sample cannot support.",
    disposition: { autonomy: 52, tone: 50, risk: 26, rigour: 90, scope: 44 },
    tools: ["read_file", "run_command", "write_file", "search_files"],
    perm: "exec",
    memory: 311,
    memoryScope: "Project + dataset schema",
    workflows: ["Weekly metrics report", "Cohort breakdown"],
    model: "code-tier",
    version: "v7",
  },
];

/* ── Fusion ──────────────────────────────────────────────────────── */

/** Composite agents get a fresh codename rather than an awkward portmanteau. */
const CODENAMES = [
  "Chimera",
  "Meridian",
  "Confluence",
  "Keystone",
  "Lattice",
  "Vertex",
  "Halcyon",
  "Cortex",
  "Obelisk",
  "Cadence",
];

export function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export type Fusion = {
  name: string;
  handle: string;
  seed: string;
  colours: string[];
  parents: Agent[];
  role: string;
  disposition: Disposition;
  tools: { tool: string; from: string[] }[];
  perm: Perm;
  permReason: string;
  memory: number;
  memoryOverlap: number;
  workflows: { name: string; from: string }[];
  conflicts: { field: string; detail: string }[];
};

/**
 * Merge rules, in plain English:
 *  · Abilities  — union of every parent's declared tools.
 *  · Memory     — union of memory items, minus the overlap the reconciler dedupes.
 *  · Workflows  — union, each keeping a pointer to the agent it came from.
 *  · Permission — the *most restrictive* parent ceiling wins. Fusion never escalates.
 *  · Disposition— mean of the parents, so the composite inherits their temperament.
 */
export function fuse(parents: Agent[]): Fusion {
  const seedStr = parents.map((p) => p.id).sort().join("+");
  const h = hash(seedStr);

  const disposition = DIALS.reduce((acc, d) => {
    acc[d.key] = Math.round(parents.reduce((s, p) => s + p.disposition[d.key], 0) / parents.length);
    return acc;
  }, {} as Disposition);

  const toolMap = new Map<string, string[]>();
  parents.forEach((p) =>
    p.tools.forEach((t) => toolMap.set(t, [...(toolMap.get(t) ?? []), p.name])),
  );

  // most restrictive ceiling across parents
  const permIdx = Math.min(...parents.map((p) => PERM_ORDER.indexOf(p.perm)));
  const perm = PERM_ORDER[permIdx];
  const ceilingSource = parents.find((p) => p.perm === perm)!;

  const totalMemory = parents.reduce((s, p) => s + p.memory, 0);
  const overlap = Math.round(totalMemory * (0.06 + (h % 70) / 1000));

  const workflows = parents.flatMap((p) => p.workflows.map((w) => ({ name: w, from: p.name })));

  const conflicts: { field: string; detail: string }[] = [];
  const shared = [...toolMap.entries()].filter(([, from]) => from.length > 1);
  if (shared.length)
    conflicts.push({
      field: "Overlapping tools",
      detail: `${shared.length} tool${shared.length > 1 ? "s" : ""} declared by more than one parent — deduped, highest-trust schema kept.`,
    });
  if (new Set(parents.map((p) => p.perm)).size > 1)
    conflicts.push({
      field: "Permission ceiling",
      detail: `Parents disagree. Clamped to ${PERM_LABEL[perm].toLowerCase()} from ${ceilingSource.name}. Widen it explicitly if you mean to.`,
    });
  if (new Set(parents.map((p) => p.model)).size > 1)
    conflicts.push({
      field: "Preferred model",
      detail: "Parents prefer different tiers. The composite routes per step instead of picking one.",
    });

  return {
    name: CODENAMES[h % CODENAMES.length],
    handle: "@" + parents.map((p) => p.id).join("-"),
    seed: seedStr,
    colours: parents.map((p) => p.colour),
    parents,
    role: parents.map((p) => p.role).join(" · "),
    disposition,
    tools: [...toolMap.entries()].map(([tool, from]) => ({ tool, from })),
    perm,
    permReason: `inherited from ${ceilingSource.name}`,
    memory: totalMemory - overlap,
    memoryOverlap: overlap,
    workflows,
    conflicts,
  };
}
