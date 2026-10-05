/**
 * Single source of truth for site copy.
 * Everything here is derived from "Curve — MVP & Full Product Specification", v1.0, Oct 2026.
 */

export const RAMP = ["citron", "aqua", "iris", "magenta", "flame", "amber"] as const;
export type Ramp = (typeof RAMP)[number];

export const HEX: Record<Ramp, string> = {
  citron: "#cdff3e",
  aqua: "#3be8c0",
  iris: "#6b5cff",
  magenta: "#ff4d9e",
  flame: "#ff6a2b",
  amber: "#ffc83d",
};

/* ── The core loop ─────────────────────────────────────────────── */

export const LOOP = [
  {
    key: "intent",
    label: "Intent",
    color: "citron" as Ramp,
    line: "You describe an outcome, not a procedure.",
    detail:
      "Curve classifies the request first — answer-only, coding, research, file task, workflow or multi-agent — so it never over-engineers a question that just needed an answer.",
  },
  {
    key: "plan",
    label: "Plan",
    color: "aqua" as Ramp,
    line: "The goal becomes ordered, inspectable steps.",
    detail:
      "Each step carries a description, the tool it needs, its expected output and a risk level. You see the plan before anything touches disk.",
  },
  {
    key: "permission",
    label: "Permission",
    color: "iris" as Ramp,
    line: "A policy engine rates every capability.",
    detail:
      "Safe steps proceed. Sensitive ones become approval gates that state what, where, why and the expected blast radius.",
  },
  {
    key: "execute",
    label: "Execute",
    color: "magenta" as Ramp,
    line: "Curve Runner performs bounded tool calls.",
    detail:
      "Filesystem, terminal and Git, scoped to the project directory, with timeouts, output limits and cancellation.",
  },
  {
    key: "verify",
    label: "Verify",
    color: "flame" as Ramp,
    line: "Actual state is compared to expected outcome.",
    detail:
      "Exit codes, diffs, test output and generated files are inspected. If verification disagrees, Curve goes back to work instead of declaring victory.",
  },
  {
    key: "reuse",
    label: "Reuse",
    color: "amber" as Ramp,
    line: "Work that succeeded becomes a workflow.",
    detail:
      "Save the run as a parameterised recipe and update project memory. Next time it is an input, not a rediscovery.",
  },
];

/* ── Three layers ──────────────────────────────────────────────── */

export const LAYERS = [
  {
    n: "I",
    name: "Intelligence",
    color: "citron" as Ramp,
    purpose: "Interpret goals, plan steps, select tools, reason and review.",
    items: ["General models", "Planner", "Verifier", "Tool & agent selection"],
    note: "Provider-independent by design.",
  },
  {
    n: "II",
    name: "Orchestration",
    color: "iris" as Ramp,
    purpose: "Projects, agents, workflows, permissions, state, approvals, verification.",
    items: ["Projects & goals", "Agents & workflows", "Memory & permissions", "Audit and observability"],
    note: "The core differentiator.",
  },
  {
    n: "III",
    name: "Execution",
    color: "flame" as Ramp,
    purpose: "Actually touch files, terminal, browser and other allowed resources.",
    items: ["Local Runner", "Browser Runner", "Mobile Runner", "Cloud Runner"],
    note: "Local first. Environment-agnostic later.",
  },
];

/* ── Capabilities ──────────────────────────────────────────────── */

export const CAPABILITIES = [
  { name: "Projects", body: "A persistent workspace holding goals, files, agents, workflows, permissions, runs and artifacts." },
  { name: "Task planning", body: "Every goal becomes ordered, inspectable steps with tool requirements and risk levels — before execution." },
  { name: "Approval gates", body: "Curve pauses before anything sensitive, destructive or externally visible. Allow once, allow for workflow, deny or edit." },
  { name: "Local execution", body: "Curve Runner performs approved actions on your machine. Your files never need to leave it." },
  { name: "File operations", body: "Read, create, edit, rename and organise — strictly inside the allowed project scope." },
  { name: "Terminal", body: "Approved commands with timeouts, captured output and working-directory restrictions." },
  { name: "Search", body: "Curve searches the project before it edits it. No blind rewrites." },
  { name: "Git awareness", body: "Inspect status and diff; create commits only after you approve them." },
  { name: "Verification", body: "Tests and checks run before Curve claims completion. Unverified means unfinished." },
  { name: "Artifacts", body: "Changed files, reports, logs, screenshots and outputs, collected per run." },
  { name: "Run history", body: "A timeline of what was planned, approved, executed and observed. Every tool call is auditable." },
  { name: "Reusable workflows", body: "Turn a successful run into a repeatable template with parameters." },
  { name: "Agent roles", body: "Planner, Coder, Researcher, Reviewer, Writer, Data Analyst — each with its own tools and permissions." },
  { name: "Model abstraction", body: "Model calls sit behind a provider interface, so Curve is never one vendor's hostage." },
];

/* ── Agents ────────────────────────────────────────────────────── */

export const AGENTS = [
  {
    role: "Planner",
    color: "citron" as Ramp,
    job: "Understand the goal, decompose the work, coordinate execution.",
    tools: ["plan.create", "plan.revise", "agent.dispatch"],
    perm: "Planning metadata · limited execution",
  },
  {
    role: "Coder",
    color: "aqua" as Ramp,
    job: "Modify software and run the checks that prove it still works.",
    tools: ["read_file", "apply_edit", "run_command", "git_diff"],
    perm: "Project write · project execute",
  },
  {
    role: "Researcher",
    color: "iris" as Ramp,
    job: "Gather and synthesise information from sources.",
    tools: ["browse", "search_files", "write_file"],
    perm: "Read-only · allowlisted network",
  },
  {
    role: "Reviewer",
    color: "magenta" as Ramp,
    job: "Inspect output for correctness before anyone trusts it.",
    tools: ["read_file", "search_files", "git_diff", "run_command"],
    perm: "Read-only",
  },
  {
    role: "Writer",
    color: "flame" as Ramp,
    job: "Produce structured documents from research and project state.",
    tools: ["read_file", "write_file", "search_files"],
    perm: "Project write",
  },
  {
    role: "Data Analyst",
    color: "amber" as Ramp,
    job: "Analyse data and generate reports.",
    tools: ["read_file", "run_command", "write_file"],
    perm: "Project write · project execute",
  },
];

export const AGENT_FIELDS = [
  "name",
  "purpose",
  "system instructions",
  "allowed tools",
  "default permission level",
  "input / output schema",
  "preferred model",
  "memory scope",
  "verification rules",
];

/* ── Runner tool contract ──────────────────────────────────────── */

export const TOOLS = [
  { tool: "read_file", input: "workspace-relative path", output: "text + metadata", gate: false },
  { tool: "write_file", input: "path + content", output: "success + metadata", gate: false },
  { tool: "apply_edit", input: "path + patch", output: "success + diff", gate: false },
  { tool: "search_files", input: "query + scope", output: "matching paths / snippets", gate: false },
  { tool: "run_command", input: "command + cwd + timeout", output: "stdout / stderr / exit code", gate: false },
  { tool: "list_files", input: "directory", output: "entries + metadata", gate: false },
  { tool: "git_status", input: "repo path", output: "status", gate: false },
  { tool: "git_diff", input: "repo path", output: "diff", gate: false },
  { tool: "create_commit", input: "message + repo", output: "commit hash", gate: true },
];

export const RUNNER_DUTIES = [
  "Authenticate with Curve",
  "Receive structured tool requests",
  "Validate every request against local and project policy",
  "Execute only what is allowed",
  "Capture stdout, stderr, exit codes and metadata",
  "Apply timeouts and cancellation",
  "Return structured results",
  "Reconnect safely",
  "Keep secrets out of model-visible data",
];

/* ── Permissions ───────────────────────────────────────────────── */

export const PERMISSIONS = [
  { level: "Read-only", examples: "Read, search, inspect", mode: "Allowed", tone: "ok" },
  { level: "Project write", examples: "Create and edit project files", mode: "Allowed with policy", tone: "ok" },
  { level: "Local execution", examples: "Run commands in project", mode: "Allowed with restrictions", tone: "warn" },
  { level: "Network", examples: "Reach approved domains", mode: "Ask", tone: "warn" },
  { level: "External write", examples: "Push, publish, send", mode: "Ask", tone: "warn" },
  { level: "Destructive", examples: "Large delete or reset", mode: "Ask every time", tone: "hot" },
  { level: "Sensitive access", examples: "Personal folders, credentials", mode: "Denied", tone: "deny" },
] as const;

export const SECURITY_PRINCIPLES = [
  "Least privilege by default",
  "Project-relative paths only",
  "No secrets in prompts, logs or artifacts",
  "Credentials stay runtime configuration",
  "Tool inputs are schema-validated",
  "Commands carry timeouts and output limits",
  "Network access is allowlisted where feasible",
  "Every action leaves an audit record",
  "The Runner makes the final permission decision",
  "Irreversible actions require explicit approval",
];

/* ── Positioning ───────────────────────────────────────────────── */

export const POSITIONING = [
  { cat: "Chat assistant", emphasis: "Conversation and answers", answer: "Useful, but insufficient for multi-step work." },
  { cat: "Coding agent", emphasis: "Repository changes", answer: "One important Curve agent, not the whole product." },
  { cat: "Computer agent", emphasis: "Operate a computer", answer: "One execution capability, not the whole product." },
  { cat: "Automation platform", emphasis: "Rules and integrations", answer: "Curve adds adaptive reasoning and agents." },
  { cat: "AI workspace", emphasis: "Projects and collaboration", answer: "Curve adds actual bounded execution." },
];

export const NOT_LIST = [
  "a chatbot with a fancy UI",
  "merely a coding agent",
  "an unrestricted remote control for your computer",
  "a frontier foundation-model company",
  "a cloud-compute business on day one",
];

/* ── Example workflow ──────────────────────────────────────────── */

export const WORKFLOW_STEPS = [
  { n: 1, action: "Load repository + instructions", approval: "no" },
  { n: 2, action: "Inspect issue and related files", approval: "no" },
  { n: 3, action: "Implement change", approval: "scoped" },
  { n: 4, action: "Run tests and build", approval: "no" },
  { n: 5, action: "Review diff", approval: "no" },
  { n: 6, action: "Create commit", approval: "yes" },
  { n: 7, action: "Push to remote", approval: "yes" },
  { n: 8, action: "Deploy", approval: "yes" },
  { n: 9, action: "Verify deployment", approval: "depends" },
] as const;

export const WORKFLOW_PARAMS = [
  "repository",
  "branch",
  "test command",
  "build command",
  "output location",
  "review strictness",
  "approval mode",
  "agent / model preference",
];

/* ── Roadmap ───────────────────────────────────────────────────── */

export const ROADMAP = [
  {
    tag: "v0.1",
    status: "shipping",
    title: "The execution loop",
    color: "citron" as Ramp,
    items: [
      "Web app: create project, chat, inspect plan, approve, view results",
      "Curve Orchestrator — task loop, tool calls, state, model interaction",
      "Curve Runner — bounded filesystem and terminal actions",
      "Planner, tool layer, approval system, verifier",
      "Run timeline, coding agent, workflow save",
    ],
  },
  {
    tag: "v0.2",
    status: "in build",
    title: "Depth and recovery",
    color: "aqua" as Ramp,
    items: [
      "GitHub repository import / export",
      "Controlled browser research",
      "Project-level environment configuration",
      "Agent roles and role switching",
      "Retry, recovery, cancellation and resume",
      "Workflow parameters, local SQLite state, encrypted secrets",
    ],
  },
  {
    tag: "v0.3",
    status: "beta",
    title: "Self-serve beta",
    color: "iris" as Ramp,
    items: [
      "Polished onboarding and permission editor",
      "Workflow library",
      "Better error explanations",
      "Consent-based telemetry and privacy-preserving crash reports",
      "One-click Curve Runner installer",
    ],
  },
  {
    tag: "Phase 2",
    status: "planned",
    title: "Connected Curve",
    color: "magenta" as Ramp,
    items: [
      "Browser execution: research, forms, source collection, approvals",
      "Issue-to-task and pull-request workflows",
      "Visual workflow builder on a canvas",
      "Agent library — every agent declares tools, permissions, I/O and version",
    ],
  },
  {
    tag: "Phase 3",
    status: "planned",
    title: "Multi-device Curve",
    color: "flame" as Ramp,
    items: [
      "Mobile Runner as a supported execution endpoint",
      "Execution Router across local, browser, mobile and cloud",
      "Cross-device handoff: start on desktop, monitor from phone",
      "Scheduled long-running jobs and cloud execution credits",
    ],
  },
];

export const ROUTER = [
  { cond: "PC online, local files", exec: "Local Runner", color: "citron" as Ramp },
  { cond: "Website interaction", exec: "Browser Runner", color: "aqua" as Ramp },
  { cond: "Supported mobile task", exec: "Mobile Runner", color: "iris" as Ramp },
  { cond: "PC offline, cloud enabled", exec: "Cloud Runner", color: "magenta" as Ramp },
  { cond: "Heavy compute", exec: "Specialised compute", color: "flame" as Ramp },
];

/* ── Pricing ───────────────────────────────────────────────────── */

export const TIERS = [
  {
    name: "Free",
    price: "₹0",
    sub: "forever",
    blurb: "Local execution on your own machine. Enough to prove Curve is useful on real work.",
    points: ["Limited projects", "Local Curve Runner", "Basic agents and workflows", "Full run history and audit"],
    cta: "Download Curve",
    href: "/download",
    featured: false,
    color: "citron" as Ramp,
  },
  {
    name: "Pro",
    price: "₹1,650",
    sub: "per month",
    blurb: "For people who hand Curve real work every day and want the fast lane.",
    points: ["Higher usage limits", "Advanced agents", "Browser tools and web research", "Priority execution", "Workflow library"],
    cta: "Start Pro",
    href: "/download",
    featured: true,
    color: "iris" as Ramp,
  },
  {
    name: "Team",
    price: "₹2,900",
    sub: "per seat / month",
    blurb: "Shared projects with permissions that survive contact with other humans.",
    points: ["Shared projects and workflows", "Role-based permissions", "Team audit logs", "Shared agent definitions"],
    cta: "Talk to us",
    href: "#contact",
    featured: false,
    color: "magenta" as Ramp,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "annual",
    blurb: "Governance, SSO and dedicated environments for organisations with rules.",
    points: ["SSO and directory sync", "Dedicated execution environments", "Compliance and retention controls", "Named support"],
    cta: "Contact sales",
    href: "#contact",
    featured: false,
    color: "flame" as Ramp,
  },
];

export const ADDONS = [
  { name: "Cloud Credits", body: "Optional usage-based credits for jobs that must continue when your machine is off. Cloud is an explicit decision, never a hidden dependency." },
  { name: "Developer / API", body: "Usage-based API for Curve-compatible agents and runners. Build your own executor; keep Curve's permission model." },
];

/* ── Downloads ─────────────────────────────────────────────────── */

export const BUILDS = [
  {
    os: "macOS",
    arch: "Apple silicon · Intel",
    file: "Curve-Runner-0.3.1-universal.dmg",
    size: "38.4 MB",
    cmd: "brew install --cask curve-runner",
    color: "aqua" as Ramp,
  },
  {
    os: "Windows",
    arch: "x64 · ARM64",
    file: "Curve-Runner-0.3.1-setup.exe",
    size: "41.2 MB",
    cmd: "winget install Curve.Runner",
    color: "iris" as Ramp,
  },
  {
    os: "Linux",
    arch: "x86_64 · aarch64",
    file: "curve-runner_0.3.1_amd64.AppImage",
    size: "44.9 MB",
    cmd: "curl -fsSL https://get.curve.dev | sh",
    color: "citron" as Ramp,
  },
];

export const FAQS = [
  {
    q: "Does Curve get access to my whole computer?",
    a: "No, and that is deliberate. By default Curve can only operate inside the project directory you select. Anything outside it is denied unless you explicitly allowlist it. The Runner — not the model — makes the final permission decision on every single tool call.",
  },
  {
    q: "What actually runs where?",
    a: "Curve splits the control plane from the execution plane. Planning, permissions, verification and state live in the Curve orchestrator. Files, terminal and Git live on your machine inside Curve Runner. The model never touches your disk directly; it emits structured tool requests that your local policy engine can refuse.",
  },
  {
    q: "Is this just another coding agent?",
    a: "The coding agent is the first flagship demonstration because it exercises the whole loop — inspect, plan, edit, execute, test, verify, diff, report. But it is one role inside a larger system. The same project can later run Researcher → Analyst → Writer → Reviewer under one permission, workflow and run-history model.",
  },
  {
    q: "Which model does Curve use?",
    a: "Model calls sit behind a provider adapter, so Curve is not architecturally married to any lab. The MVP ships with one provider for simplicity; the interface is designed so swapping or mixing providers is a configuration change, not a rewrite.",
  },
  {
    q: "What happens when Curve is wrong?",
    a: "It captures the failing output, diagnoses, and retries if retrying is safe. After the retry budget it stops and asks you. Curve is built to prefer \"I could not verify this, so I stopped\" over a confident, unverified success.",
  },
  {
    q: "Do I need cloud compute?",
    a: "Not for the MVP. Curve is local-first: your machine does the execution, which is why the free tier can exist. Cloud Runners arrive when there is a concrete reason — your PC is offline, the job runs for hours, or the work needs a standardised environment — and they stay an explicit, priced choice.",
  },
  {
    q: "Can I reuse work Curve has already done?",
    a: "Yes. Any successful run can be saved as a parameterised workflow: trigger, inputs, plan, agent steps, conditions, approvals, execution, verification, outputs. Re-run it with a new repository, branch or dataset instead of rediscovering the procedure.",
  },
];

export const METRICS = [
  { k: "Task completion rate", v: "Does Curve accomplish the requested work?" },
  { k: "Verified completion rate", v: "How often does verification agree with the claim?" },
  { k: "Human intervention rate", v: "How much supervision is actually needed?" },
  { k: "Approval acceptance rate", v: "Are the permission prompts understandable?" },
  { k: "Time to useful result", v: "Is Curve faster than doing it yourself?" },
  { k: "Workflow reuse rate", v: "Do saved procedures matter in practice?" },
  { k: "Cost per completed task", v: "Critical for future cloud economics." },
];
