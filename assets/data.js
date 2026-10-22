// Content layer.
// Everything below is SAMPLE content for the prototype. Replace `issues`
// with real editions later (or swap this module for a fetch from a CMS / API).

export const site = {
  name: 'Kernel',
  tagline: 'The signal in AI & technology.',
  description: 'A weekly briefing on AI and technology. Clear, considered, and built for people who build.',
  cadence: 'Every Monday',
  version: '0.1.0',
};

export const topics = [
  { id: 'models', name: 'Models', icon: 'sparkles', blurb: 'Foundation models, capabilities and how they are changing.' },
  { id: 'infrastructure', name: 'Infrastructure', icon: 'server', blurb: 'Compute, networks, and the systems underneath it all.' },
  { id: 'developer-tools', name: 'Developer Tools', icon: 'terminal', blurb: 'How software gets written, shipped and maintained.' },
  { id: 'research', name: 'Research', icon: 'flask', blurb: 'Papers, methods, and reading results carefully.' },
  { id: 'hardware', name: 'Hardware', icon: 'chip', blurb: 'Silicon, devices, and the physical side of computing.' },
  { id: 'policy', name: 'Policy', icon: 'scale', blurb: 'Regulation, governance and the rules of the road.' },
];

export const issues = [
  {
    number: 8,
    slug: 'the-new-shape-of-the-model-stack',
    title: 'The new shape of the model stack',
    dek: 'Models are becoming components, not products. What that means for the teams building on top of them.',
    topic: 'models',
    date: '2026-10-19',
    author: 'Kernel Editors',
    body: `
<p>For a while, the model <em>was</em> the product. You picked one, wrote a prompt, and shipped whatever came back. That era is ending quietly. The interesting work has moved into the layers around the model: retrieval, tools, evaluation, routing, and the glue that holds them together.</p>
<p>This issue is a map of that new stack, and a few opinions about where it is heading.</p>

<h2>From one model to many</h2>
<p>Most serious systems no longer call a single model. They call several — a fast one to classify, a capable one to reason, a small one to check the work. The architecture looks less like a chatbot and more like a compiler pipeline.</p>
<blockquote>The best AI products of the next few years will be defined less by which model they use, and more by how well they decide when to use it.</blockquote>
<p>That shift changes what “quality” means. It is no longer a property of a model; it is a property of a system.</p>

<h2>Three layers worth watching</h2>
<ul>
  <li><strong>Routing.</strong> Choosing the right model for each step, based on cost, latency and difficulty.</li>
  <li><strong>Grounding.</strong> Connecting models to the data and tools they need, with clear permissions.</li>
  <li><strong>Evaluation.</strong> Measuring behaviour continuously, not once before launch.</li>
</ul>

<h2>A small example</h2>
<p>Here is the shape of a routing step in a typical pipeline. Nothing exotic — which is the point.</p>
<pre><code>const route = (task) =&gt; {
  if (task.tokens &lt; 2_000 &amp;&amp; task.kind === 'classify') return 'small';
  if (task.requiresTools) return 'agentic';
  return 'general';
};</code></pre>

<div class="callout"><strong>Takeaway</strong><p>Treat models as interchangeable parts. Invest in the layers that make swapping them safe.</p></div>

<h2>What to do this week</h2>
<p>Pick one workflow you own and write down every model call it makes. You will likely find at least one step that could be cheaper, faster, or simply removed.</p>
`,
  },
  {
    number: 7,
    slug: 'inference-moves-to-the-edge',
    title: 'Inference moves to the edge',
    dek: 'Latency is a feature. Why more AI workloads are running closer to the people using them.',
    topic: 'infrastructure',
    date: '2026-10-12',
    author: 'Kernel Editors',
    body: `
<p>Every millisecond between a question and an answer is felt. For conversational interfaces, that delay is the product. So it is no surprise that inference is drifting outward — from a handful of large regions to networks of smaller locations near users.</p>
<h2>Why now</h2>
<p>Smaller, efficient models have made it practical to serve useful capability on modest hardware. Combine that with global networks that already sit close to users, and the edge becomes a natural home for the first hop of many AI requests.</p>
<blockquote>Centralise what is heavy. Distribute what is frequent.</blockquote>
<h2>The trade-offs</h2>
<ul>
  <li>Edge locations have less memory, so model size matters.</li>
  <li>Caching and routing become first-class design decisions.</li>
  <li>Observability gets harder when work is spread thin.</li>
</ul>
<p>The pattern we expect to win: answer simple requests at the edge, escalate hard ones to the core, and make the hand-off invisible.</p>
`,
  },
  {
    number: 6,
    slug: 'agents-need-better-boundaries',
    title: 'Agents need better boundaries',
    dek: 'Autonomy without guardrails is just risk. A practical framework for scoping what agents can do.',
    topic: 'developer-tools',
    date: '2026-10-05',
    author: 'Kernel Editors',
    body: `
<p>Agents are the most exciting and the most misunderstood idea in software right now. Give a model tools and a goal, and it can do remarkable things. Give it tools without limits, and it can do remarkable damage.</p>
<h2>Scope, then permission, then audit</h2>
<p>A useful mental model is the one we already use for people: define the job, grant the minimum access to do it, and keep a record of what happened.</p>
<ul>
  <li><strong>Scope:</strong> what is this agent for, and what is explicitly out of bounds?</li>
  <li><strong>Permission:</strong> which tools, which data, read or write?</li>
  <li><strong>Audit:</strong> can a human reconstruct every action afterwards?</li>
</ul>
<div class="callout"><strong>Rule of thumb</strong><p>If you would not give the access to a new contractor on their first day, do not give it to an agent.</p></div>
<p>The teams shipping agents successfully are not the ones with the cleverest prompts. They are the ones with the clearest boundaries.</p>
`,
  },
  {
    number: 5,
    slug: 'reading-a-benchmark-without-being-fooled',
    title: 'Reading a benchmark without being fooled',
    dek: 'Leaderboards are useful and easy to misread. Five questions to ask before you trust a number.',
    topic: 'research',
    date: '2026-09-28',
    author: 'Kernel Editors',
    body: `
<p>A single score at the top of a chart is persuasive. It is also, very often, the least informative thing on the page. Before you let a benchmark change your roadmap, ask a few questions.</p>
<ol>
  <li>What exactly is being measured, and does it resemble your task?</li>
  <li>How was the test set built, and could it have leaked into training data?</li>
  <li>How large are the differences relative to the noise?</li>
  <li>Who ran the evaluation, and with what settings?</li>
  <li>What does the model get wrong, not just how often?</li>
</ol>
<blockquote>The most valuable benchmark is the one you build from your own data.</blockquote>
<p>Public benchmarks are a starting point. Your own evaluation set — even fifty carefully chosen examples — is the thing that should decide.</p>
`,
  },
  {
    number: 4,
    slug: 'silicon-is-the-new-strategy',
    title: 'Silicon is the new strategy',
    dek: 'Why chips have moved from the procurement spreadsheet to the boardroom agenda.',
    topic: 'hardware',
    date: '2026-09-21',
    author: 'Kernel Editors',
    body: `
<p>Not long ago, hardware was something you bought, not something you planned around. AI has changed that. Access to compute now shapes which products are possible, how fast they ship, and what they cost to run.</p>
<h2>Three questions every team should be able to answer</h2>
<ul>
  <li>What is our cost per useful result, not per token?</li>
  <li>Which workloads are bound by memory, and which by compute?</li>
  <li>How portable is our stack across different accelerators?</li>
</ul>
<p>Portability, in particular, is underrated. The teams that can move workloads between hardware generations — and vendors — will have leverage that others will not.</p>
`,
  },
  {
    number: 3,
    slug: 'rules-for-a-technology-still-being-written',
    title: 'Rules for a technology still being written',
    dek: 'Regulation is arriving while the technology is still moving. How builders can stay ahead of it.',
    topic: 'policy',
    date: '2026-09-14',
    author: 'Kernel Editors',
    body: `
<p>Policy and technology move at different speeds. That gap is where uncertainty lives — and where thoughtful teams can turn compliance into an advantage.</p>
<h2>Build the habits now</h2>
<p>Most emerging frameworks ask for the same underlying things: know what your system does, document how it was built, test it for foreseeable harms, and be able to explain decisions to the people they affect.</p>
<div class="callout"><strong>In practice</strong><p>Keep a living record of your data sources, evaluations and known limitations. You will need it, whatever the final rules say.</p></div>
<p>Teams that treat transparency as an engineering discipline rather than a legal afterthought will find the coming rules far less disruptive.</p>
`,
  },
  {
    number: 2,
    slug: 'the-case-for-boring-infrastructure',
    title: 'The case for boring infrastructure',
    dek: 'The most reliable systems are rarely the most exciting. A defence of choosing proven tools.',
    topic: 'infrastructure',
    date: '2026-09-07',
    author: 'Kernel Editors',
    body: `
<p>There is a quiet discipline in choosing the boring option. Proven databases, well-understood queues, plain HTTP. These choices rarely make headlines, but they let teams spend their limited novelty budget where it matters.</p>
<blockquote>Innovate on the product. Be conservative on the plumbing.</blockquote>
<p>AI makes this more important, not less. When the model layer is changing every few months, the layers beneath it should be the ones you never have to think about.</p>
`,
  },
  {
    number: 1,
    slug: 'a-field-guide-to-the-next-decade',
    title: 'A field guide to the next decade',
    dek: 'Our first issue: what Kernel is, what we will cover, and how we think about signal versus noise.',
    topic: 'research',
    date: '2026-08-31',
    author: 'Kernel Editors',
    body: `
<p>Welcome to Kernel. Every week we will send one considered briefing on AI and technology — the developments that matter, explained clearly, without the noise.</p>
<h2>What we cover</h2>
<ul>
  <li>Models and the systems built around them</li>
  <li>Infrastructure, hardware and the economics of compute</li>
  <li>Developer tools and how software gets made</li>
  <li>Research, read carefully</li>
  <li>Policy and the rules taking shape</li>
</ul>
<h2>How we work</h2>
<p>We would rather be right than first. We link to primary sources. And we try to end every issue with something you can actually use.</p>
<p>Thank you for reading. We are glad you are here.</p>
`,
  },
];
