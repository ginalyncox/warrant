/* Course content and answer keys. Quotes come from the KWQC caption transcript (Oct. 6, 2026). */
window.SEG = {
  open: 'https://www.youtube.com/watch?v=DDgh_jG3DJ8',
  econ: 'https://www.youtube.com/watch?v=rcr_xh61yy4',
  budget: 'https://www.youtube.com/watch?v=AOtP1RRb0UQ',
  edu: 'https://www.youtube.com/watch?v=VPrgql7q4Hg',
  health: 'https://www.youtube.com/watch?v=r9JbC5ZxRRs',
  close: 'https://www.youtube.com/watch?v=uSQHLjTVz14'
};

window.COURSE = [
  { level: 'I', name: 'Foundations', sub: 'Undergraduate argumentation', modules: ['flow', 'toulmin', 'fallacy'] },
  { level: 'II', name: 'Judgment', sub: 'Debate-professor evaluation', modules: ['evidence', 'viral', 'rubric'] },
  { level: 'III', name: 'Theory', sub: 'Doctoral rhetorical criticism', modules: ['lenses', 'benoit', 'research'] }
];

window.MODULES = {
  flow: { n: '01', title: 'Flowing the Debate', short: 'Flowing', mins: 15 },
  toulmin: { n: '02', title: 'Anatomy of an Argument', short: 'Toulmin', mins: 15 },
  fallacy: { n: '03', title: 'Fallacy or Fair Hit?', short: 'Fallacies', mins: 15 },
  evidence: { n: '04', title: 'Evidence Lab', short: 'Evidence', mins: 20 },
  viral: { n: '05', title: 'Checking a Viral Post', short: 'Viral posts', mins: 20 },
  rubric: { n: '06', title: 'Grade the Round', short: 'Rubrics', mins: 15 },
  lenses: { n: '07', title: 'Theoretical Lenses', short: 'Lenses', mins: 25 },
  benoit: { n: '08', title: 'Functional Coding', short: 'Coding', mins: 20 },
  research: { n: '09', title: 'Designing a Study', short: 'Research', mins: 15 }
};

/* ---------- 01 FLOW ---------- */
window.FLOW_OPTIONS = ['Answered', 'Partly answered', 'Redirected', 'Dropped'];
window.FLOW = [
  { seg: 'Economy', from: 'Sand', arg: 'End Medicaid privatization: illegal denials of care rose 500% and providers pay staff just to fight for payment.',
    resp: 'Lahn moves straight to taxes: "He has not seen a tax increase that he did not like."', key: 'Dropped',
    why: 'Lahn never touches Medicaid, the denial figure, or provider costs. On a strict flow, the argument stands unrefuted.' },
  { seg: 'Economy', from: 'Sand', arg: 'Cap utility fees so families who cut usage actually see lower bills.',
    resp: 'Lahn: capping fees is "out of touch" when Sand opposes tax cuts.', key: 'Redirected',
    why: 'Lahn responds to the speaker, not the proposal. He shifts the ground from utility fees to tax policy without explaining why a fee cap fails.' },
  { seg: 'Economy', from: 'Lahn', arg: 'Sand\'s positions would cost a family of four $7,500 a year in taxes.',
    resp: 'Sand: "No. And that\'s been fact checked and called false," then quotes his own words about how tax cuts get paid for.', key: 'Answered',
    why: 'Direct denial, a cited fact-check, and a counter-reading of the evidence Lahn relies on. That is a complete refutation.' },
  { seg: 'Economy', from: 'Sand', arg: 'A tax cut with no plan to pay for it means cutting services or raising taxes elsewhere.',
    resp: 'Lahn: the state over-collected about $4 billion into the Taxpayer Relief Fund and planned a drawdown.', key: 'Answered',
    why: 'This is Lahn\'s best piece of clash. He identifies the funding source Sand says is missing. Sand never answers the drawdown point.' },
  { seg: 'Economy', from: 'Lahn', arg: 'Sand never provides a plan to make life more affordable.',
    resp: 'Sand: "I think I just named like seven things."', key: 'Partly answered',
    why: 'Sand points to his earlier list, which is fair, but he does not extend or defend any specific item. Points for awareness, not for development.' },
  { seg: 'Economy', from: 'Moderator', arg: 'Would you raise the minimum wage, which hasn\'t moved since 2009?',
    resp: 'Lahn: "Let\'s go deep" into consolidation, then proposes Attorney General antitrust funding.', key: 'Redirected',
    why: 'The antitrust plan is real policy, but it never answers yes or no on the minimum wage. Judges score responsiveness to the question asked.' },
  { seg: 'Education', from: 'Lahn', arg: 'Per-pupil spending rose about 50% (inflation-adjusted) since 1992 while Iowa dropped from first to 27th, so money alone is not the problem.',
    resp: 'Sand never addresses the spending-versus-results argument.', key: 'Dropped',
    why: 'This is Lahn\'s strongest data-driven argument against Sand\'s 5% proposal, and it goes unanswered for the rest of the debate.' },
  { seg: 'Education', from: 'Sand', arg: 'Private schools can reject students while taking public money; restore an income limit on vouchers.',
    resp: 'Lahn supports third-party audits, then says the auditor\'s office "can\'t be trusted."', key: 'Partly answered',
    why: 'Lahn answers the audit piece only. The admissions point and the income limit are never engaged.' },
  { seg: 'Education', from: 'Lahn', arg: 'Create innovation zones and non-punitive off-ramps so students get one-on-one help.',
    resp: 'No direct response. In closing, Sand says Lahn has only "platitudes."', key: 'Dropped',
    why: 'Dismissing a proposal in closing is not refutation. A judge would also note the "platitudes" label mischaracterizes a specific plan.' },
  { seg: 'Education', from: 'Moderator', arg: 'Iowa voters want to know whether you will be accessible given your travels.',
    resp: 'Lahn: "This has already been debunked... This is full-time job and I\'m here for it 100%."', key: 'Partly answered',
    why: 'He commits to full-time service, which is responsive, but offers no detail on arrangements. Assertion without support.' },
  { seg: 'Education', from: 'Sand', arg: 'Lahn voted in Kansas in 2018, 2020 and 2022 and registered in Iowa less than two years ago.',
    resp: 'Lahn reframes: the issue is his blended family, and Sand is "targeting my kids."', key: 'Redirected',
    why: 'The voting record is never disputed. Shifting to motive and family leaves the factual claim conceded.' },
  { seg: 'Health', from: 'Lahn', arg: 'There is no cancer vaccine; Sand confuses vaccines with therapies.',
    resp: 'Sand: "I\'m sure my team will throw up all of the statements he\'s made."', key: 'Dropped',
    why: 'Promising evidence later earns nothing in the round. The terminology point stands on the flow even though parts of it are factually weak.' }
];

/* ---------- 02 TOULMIN ---------- */
window.TOULMIN_PARTS = ['Claim', 'Data', 'Warrant', 'Qualifier', 'Rebuttal gap'];
window.TOULMIN_DEFS = {
  'Claim': 'The conclusion the speaker wants you to accept.',
  'Data': 'The facts or evidence offered in support.',
  'Warrant': 'The reasoning that connects the data to the claim. Often unstated.',
  'Qualifier': 'Words that limit the strength or scope of the claim.',
  'Rebuttal gap': 'Toulmin\'s rebuttal names the conditions under which the claim would not hold. Here: the strongest exception the speaker leaves unanswered. (Toulmin\'s sixth part, backing, supports the warrant itself.)'
};
window.TOULMIN = [
  { title: 'Sand on school funding', who: 'Sand', src: 'edu', time: '2:35',
    frags: [
      { x: 'Give public schools a 5% increase in the first year.', key: 'Claim' },
      { x: 'Iowa went from fifth in 2018 to the bottom half, and schools were funded below inflation for years.', key: 'Data' },
      { x: 'Funding below inflation contributes to declining performance and experienced teachers leaving.', key: 'Warrant' },
      { x: '"I don\'t want to make a promise after that."', key: 'Qualifier' },
      { x: 'How is a 5% increase paid for with a $1.4 billion deficit he himself raised?', key: 'Rebuttal gap' }
    ],
    note: 'The qualifier is a sign of sophistication: it limits the promise to what he can defend. The gap is real, and Lahn exploits a version of it when he argues spending does not track results.' },
  { title: 'Lahn on school performance', who: 'Lahn', src: 'edu', time: '4:29',
    frags: [
      { x: 'The issue is not just funding; it is a lack of innovation and too much red tape.', key: 'Claim' },
      { x: 'Per-pupil spending rose 50% inflation-adjusted since 1992 while Iowa dropped 27 points.', key: 'Data' },
      { x: 'If spending rose while results fell, money alone cannot be what drives results.', key: 'Warrant' },
      { x: '"There\'s funding issues, no doubt about it."', key: 'Qualifier' },
      { x: 'Correlation over 30 years does not show that innovation zones would reverse the trend.', key: 'Rebuttal gap' }
    ],
    note: 'Structurally this is Lahn\'s best argument of the night. The data is roughly supported by an advocacy study (43% from 1992 to 2017), and the warrant is explicit. The gap is causal: falling rankings could have many causes.' },
  { title: 'An appearance-based endorsement', who: 'Social post', src: null, time: null,
    frags: [
      { x: 'This candidate has the character and conviction to govern Iowa.', key: 'Claim' },
      { x: 'He wore a tie, looked composed, and "commanded the stage."', key: 'Data' },
      { x: 'Unstated: how a person looks on stage reveals character and judgment.', key: 'Warrant' },
      { x: 'None. The post presents the conclusion as certain.', key: 'Qualifier' },
      { x: 'Nothing connects attire or bearing to policy, record, or judgment.', key: 'Rebuttal gap' }
    ],
    note: 'The classic missing-warrant argument. Once you write the warrant out, it is easy to see why it fails: it is the step doing all the work, and it is never defended.' }
];

/* ---------- 03 FALLACY ---------- */
window.FALLACY_OPTIONS = ['Ad hominem', 'Straw man', 'Red herring', 'Tu quoque', 'Genetic fallacy', 'Appeal to emotion', 'Unmet burden of proof', 'Legitimate argument'];
window.FALLACY_DEFS = {
  'Ad hominem': 'Attacking the person instead of the argument, when the personal fact is irrelevant to the claim.',
  'Straw man': 'Restating the opponent\'s position in a weaker or distorted form, then attacking that version.',
  'Red herring': 'Introducing an unrelated issue to pull attention away from the question at hand.',
  'Tu quoque': '"You do it too." Deflecting criticism by accusing the critic of the same thing.',
  'Genetic fallacy': 'Judging a claim true or false by where it came from, who funded it, or why someone believes it, rather than by the evidence.',
  'Appeal to emotion': 'Substituting fear, pity, or outrage for reasons.',
  'Unmet burden of proof': 'Asserting a contested claim without supporting it, or demanding the other side disprove it.',
  'Legitimate argument': 'A personal or pointed claim that is relevant and supported. Not every attack is a fallacy.'
};
window.FALLACY = [
  { who: 'Lahn', src: 'econ', time: '12:47', q: '"Either way, Rob, you have a billionaire family and you want to raise taxes."', key: 'Ad hominem',
    why: 'After a fact-check cuts his number, Lahn shifts to Sand\'s family wealth. Wealth is irrelevant to whether the tax claim is true, and the "billionaire" label is itself unsupported.' },
  { who: 'Lahn', src: 'econ', time: '10:59', q: '"He has not seen a tax increase that he did not like."', key: 'Straw man',
    why: 'Sand criticized how tax cuts would be paid for. He did not propose broad tax increases, and his campaign says he would not reverse the income tax cuts.' },
  { who: 'Sand', src: 'health', time: '2:58', q: '"I actually voted for it in 2010 cuz I lived here. You didn\'t. You\'ve been in Montana. You\'ve been in Colorado."', key: 'Red herring',
    why: 'The question was about cancer. Residency has nothing to do with whether IWILL funding works. The moderator had to tell Sand to stick to the point.' },
  { who: 'Lahn', src: 'edu', time: '12:12', q: '"Yes, I travel... You know who else travels? Rob. Rob traveled to Aspen, Colorado..."', key: 'Tu quoque',
    why: 'Whether Sand travels does not answer whether Lahn will be a full-time governor. It also misattributes properties owned by Sand\'s in-laws.' },
  { who: 'Lahn', src: 'edu', time: '12:12', q: '"I will spend whatever effort necessary to defend my children from people who\'d like to exploit them like you."', key: 'Appeal to emotion',
    why: 'Sand\'s claim concerned voting records and availability, not Lahn\'s children. Recasting it as an attack on children substitutes protective outrage for a reply.' },
  { who: 'Sand', src: 'edu', time: '14:45', q: '"This is not about why you\'re in Kansas. This is about the fact that you\'re not in Iowa."', key: 'Unmet burden of proof',
    why: 'Sand asserts the strong claim (Lahn does not live in Iowa) but supports only a weaker one (past Kansas voting). Lahn\'s "you have no evidence of that" is a fair objection.' },
  { who: 'Sand', src: 'edu', time: '14:04', q: '"Voted in Kansas in 2018 and in \'20 and in \'22. You registered to vote in Iowa less than two years ago."', key: 'Legitimate argument',
    why: 'Personal, yes, but relevant to residency and verified by public records. Walton\'s point: a circumstantial attack is legitimate when the circumstance bears on the claim at issue.' },
  { who: 'Sand', src: 'close', time: '0:59', q: '"He\'s got platitudes that show that he doesn\'t have the demonstrated knowledge or experience."', key: 'Straw man',
    why: 'Lahn offered specific proposals (innovation zones, saturated buffers, antitrust funding). Calling them platitudes attacks a weaker version of his case.' },
  { who: 'Lahn', src: 'health', time: '5:52', q: '"During COVID, Rob Sand was lock step with Anthony Fauci. He was a COVID Karen."', key: 'Ad hominem',
    why: 'Name-calling inside an exchange about cancer treatments. It gives the audience no reason to think Sand\'s claim is false.' },
  { who: 'Lahn', src: 'edu', time: '11:35', q: '"He\'s been spreading this lie using money that his family has given him to do that all over the airwaves."', key: 'Genetic fallacy',
    why: 'Who paid for the ads says nothing about whether the residency claim is true. The same error runs the other way: a voter who dislikes a candidate can still make a correct argument about him. Bias affects how much we trust a source, not whether the argument is valid. Circumstantial ad hominem is a defensible second answer; genetic fits better because the target is the claim\'s origin (who paid for the ads), not Sand\'s character.' },
  { who: 'Lahn', src: 'econ', time: '13:46', q: '"They over-collected taxes to the tune of $4 billion in the taxpayer relief fund... and they\'ve had a planned draw down."', key: 'Legitimate argument',
    why: 'Directly answers Sand\'s "how will you pay for it" with a specific, accurate funding source. This is clean refutation.' }
];

/* ---------- 04 EVIDENCE ---------- */
window.CLAIM_TYPES = ['Verifiable fact', 'Characterization', 'Opinion'];
window.VERDICTS = ['Accurate', 'Mostly accurate', 'Needs context', 'Overstated', 'False', 'Unverifiable'];
window.EVIDENCE = [
  { who: 'Sand', q: 'Lahn "voted in Kansas in 2018 and in \'20 and in \'22."', type: 'Verifiable fact', verdict: 'Accurate',
    why: 'Kansas records show the 2018 and 2020 general elections and the August 2022 primary.', src: 'PolitiFact', url: 'https://politifact.com/article/2026/oct/06/zach-lahn-rob-sand-iowa-governor-midterm-elections/' },
  { who: 'Lahn', q: 'Sand\'s positions would cost a family of four "$7,500 per year."', type: 'Verifiable fact', verdict: 'False',
    why: 'Savings from the cuts Sand criticized total about $3,500, and Sand says he would not reverse Iowa\'s income tax cuts.', src: 'PolitiFact', url: 'https://politifact.com/factchecks/2026/sep/17/zach-lahn/rob-sand-7500-tax-increase-iowa-governor/' },
  { who: 'Sand', q: 'Iowa\'s public education system "is now in the bottom half."', type: 'Verifiable fact', verdict: 'Accurate',
    why: 'U.S. News ranked Iowa 26th in 2026; the Annie E. Casey Foundation ranked it 27th.', src: 'PolitiFact', url: 'https://politifact.com/article/2026/oct/06/zach-lahn-rob-sand-iowa-governor-midterm-elections/' },
  { who: 'Lahn', q: 'Sand\'s family money "came from selling high nitrate fertilizer."', type: 'Characterization', verdict: 'Needs context',
    why: 'Boyer Valley sells an organic high-nitrogen garden fertilizer, not the synthetic farm fertilizer behind Iowa\'s nitrate problem.', src: 'KCRG', url: 'https://www.kcrg.com/2026/10/04/fact-check-zach-lahns-ad-targeting-rob-sands-donors/' },
  { who: 'Sand', q: 'Iowa faces a "$1.4 billion budget deficit."', type: 'Verifiable fact', verdict: 'Accurate',
    why: 'State revenue estimates put the shortfall at nearly $1.4 billion.', src: 'Iowa Public Radio', url: 'https://www.iowapublicradio.org/state-government-news/2026-03-12/iowa-faces-back-to-back-1-billion-budget-deficits-as-panel-reduces-revenue-estimates' },
  { who: 'Lahn', q: 'Iowa has "lost 10,000 family farms in the past 20 years."', type: 'Verifiable fact', verdict: 'Overstated',
    why: 'Iowa lost nearly 10,000 farms from 1997 to 2022, which is 25 years, not 20.', src: 'The Gazette', url: 'https://www.thegazette.com/article/farm-crisis-shapes-iowa-producers-who-grew-up-in-the-1980s/' },
  { who: 'Lahn', q: 'A saturated buffer at Bear Creek "removed 100% of the nitrate load."', type: 'Verifiable fact', verdict: 'Overstated',
    why: 'It removed 100% of the nitrate from 60% of the tile flow in its first year.', src: 'ISU Leopold Center', url: 'https://www.leopold.iastate.edu/files/page/files/Practices-to-Improve-Water-Quality_revised_9-2016_1.pdf' },
  { who: 'Lahn', q: '"There is no cancer vaccine... There\'s not any in trial."', type: 'Verifiable fact', verdict: 'False',
    why: 'Cancer vaccines exist: the HPV vaccine (FDA-approved 2006) prevents cervical and other cancers, and sipuleucel-T (Provenge, FDA-approved 2010) is a therapeutic vaccine for prostate cancer. "Not any in trial" is also false: Merck and Moderna\'s individualized mRNA melanoma product, which Merck calls a "therapy," just met its endpoints in a Phase 3 trial. The vaccine/therapy distinction Lahn draws is real but does not rescue the claim.', src: 'Merck', url: 'https://www.merck.com/news/merck-and-moderna-announce-phase-3-interpath-001-trial-of-intismeran-autogene-plus-keytruda-met-endpoints-of-recurrence-free-survival-rfs-and-distant-metastasis-free-survival-dmfs-in-patient/' },
  { who: 'Sand', q: 'Iowa has the highest radon levels in the country.', type: 'Verifiable fact', verdict: 'Accurate',
    why: 'Iowa has the highest average indoor radon concentration in the United States.', src: 'Iowa Starting Line', url: 'https://iowastartingline.com/cancer-in-iowa/radon-exposure-fueling-iowa-lung-cancer/' },
  { who: 'Lahn', q: 'The state "over-collected" about $4 billion into the Taxpayer Relief Fund.', type: 'Verifiable fact', verdict: 'Accurate',
    why: 'The fund peaked at $4 billion in 2025 and is now projected to fall toward $2.6 billion.', src: 'Common Sense Institute', url: 'https://commonsenseinstituteus.org/iowa/research/state-budget/the-iowa-budget-then-and-now-fy27/' },
  { who: 'Sand', q: '"This is about the fact that you\'re not in Iowa."', type: 'Characterization', verdict: 'Unverifiable',
    why: 'Kansas ties and frequent flights are documented, but no authority has found Lahn does not live in Iowa.', src: 'PolitiFact', url: 'https://politifact.com/article/2026/oct/06/zach-lahn-rob-sand-iowa-governor-midterm-elections/' },
  { who: 'Lahn', q: '"Rob is a radical liberal."', type: 'Opinion', verdict: 'Unverifiable',
    why: 'An ideological label, not a checkable fact. Analysts evaluate whether it is supported by positions, not whether it is "true."', src: null, url: null },
  { who: 'Lahn', q: '"I never said that whatsoever. I talked about the COVID vaccine."', type: 'Verifiable fact', verdict: 'False',
    why: 'Radio Iowa reported in January that Lahn was among four GOP candidates backing a ban on mRNA vaccines.', src: 'Radio Iowa', url: 'https://www.radioiowa.com/2026/01/31/four-gop-candidates-for-iowa-governor-back-mrna-vaccine-ban/' },
  { who: 'Sand', q: 'His in-laws\' business "doesn\'t sell nitrate fertilizer."', type: 'Verifiable fact', verdict: 'Mostly accurate',
    why: 'True of synthetic nitrate fertilizer; the company does sell an organic high-nitrogen product for gardens.', src: 'PolitiFact', url: 'https://politifact.com/article/2026/oct/06/zach-lahn-rob-sand-iowa-governor-midterm-elections/' }
];

/* ---------- 06 RUBRICS ---------- */
window.LETTERS = ['A', 'A−', 'B+', 'B', 'B−', 'C+', 'C', 'C−', 'D+', 'D', 'F'];
window.LETTER_GPA = { 'A': 4.0, 'A−': 3.7, 'B+': 3.3, 'B': 3.0, 'B−': 2.7, 'C+': 2.3, 'C': 2.0, 'C−': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0 };
window.RUBRICS = {
  professor: {
    name: 'Debate professor', kind: 'letter',
    blurb: 'Weighted letter grades. Accuracy counts inside the evidence category; rebuttals built on false premises lose credit.',
    rows: [
      { c: 'Answering the question', w: 25, sand: 'B−', lahn: 'C' },
      { c: 'Building arguments and proposals', w: 25, sand: 'A−', lahn: 'B' },
      { c: 'Evidence and factual accuracy', w: 20, sand: 'B', lahn: 'D+' },
      { c: 'Rebuttal', w: 20, sand: 'B', lahn: 'C' },
      { c: 'Discipline and decorum', w: 10, sand: 'C+', lahn: 'D+' }
    ]
  },
  strict: {
    name: 'Strict academic', kind: 'points',
    blurb: 'Points out of 100. Dropped arguments count as conceded, fallacies carry deductions, and evidence errors cost credibility.',
    rows: [
      { c: 'Answering and engaging the opponent', max: 20, sand: 15, lahn: 11 },
      { c: 'Argument construction', max: 20, sand: 17, lahn: 14 },
      { c: 'Evidence quality and accuracy', max: 20, sand: 16, lahn: 8 },
      { c: 'Refutation and dropped arguments', max: 20, sand: 12, lahn: 9 },
      { c: 'Logical soundness', max: 10, sand: 6, lahn: 3 },
      { c: 'Conduct and moderator compliance', max: 10, sand: 7, lahn: 3 }
    ]
  }
};

/* ---------- 07 LENSES ---------- */
window.LENSES = [
  { name: 'Pragma-dialectics', who: 'van Eemeren & Grootendorst',
    idea: 'A debate is an attempt to resolve a difference of opinion. Ten rules govern a reasonable "critical discussion." A fallacy is a violation of one of those rules.',
    key: 'Strategic maneuvering (van Eemeren & Houtlosser): speakers try to be reasonable and effective at once. The analyst asks where effectiveness overtook reasonableness.',
    prompt: 'Which discussion rule does Lahn\'s "central lie" response to the Kansas claim violate, and which rule does Sand\'s "you\'re not in Iowa" violate?',
    model: 'Sand\'s claim strains Rule 2, the burden-of-proof rule: he advanced a standpoint (Lahn does not live in Iowa) and defended only a weaker one (past Kansas voting). Lahn\'s reply breaks Rule 1, the freedom rule, which is where pragma-dialectics places ad hominem: calling the claim a "central lie" funded by family money attacks Sand\'s motives instead of the standpoint. It also strains Rule 4, relevance, because wealth and motive do not bear on where Lahn lives. A pragma-dialectical reading treats both as derailments of strategic maneuvering, not just bad manners.' },
  { name: 'Argumentation schemes', who: 'Douglas Walton',
    idea: 'Arguments follow recognizable schemes, each with "critical questions." An argument is reasonable or fallacious depending on whether it survives its critical questions.',
    key: 'Ad hominem is not automatically a fallacy. A circumstantial attack can be legitimate if the circumstance is relevant to the claim.',
    prompt: 'Apply the critical questions for circumstantial ad hominem to Sand\'s Kansas attack. Is it legitimate?',
    model: 'In Walton\'s scheme, a circumstantial attack alleges an inconsistency between what a person professes and how they act. Here: Lahn presents himself as a "sixth-generation Iowan," but voted in Kansas through 2022. Is the personal circumstance true? Yes, the voting record is documented. Is it relevant to the conclusion? Partly: past residency bears on familiarity and commitment, and availability bears on fitness to serve. Does it support the strong conclusion drawn? No: voting in 2022 does not establish that Lahn lives elsewhere now. Verdict: legitimate as a question about fitness, overreaching as proof of non-residency.' },
  { name: 'Functional theory', who: 'William Benoit',
    idea: 'Campaign messages do three things: acclaim (praise yourself), attack (criticize the opponent), or defend (respond to an attack). Each concerns policy or character.',
    key: 'Across decades of debates, candidates acclaim more than they attack, and winners tend to emphasize policy over character.',
    prompt: 'Predict the pattern before you code. Who will have the higher ratio of attacks to acclaims, and on which topic?',
    model: 'Lahn is the likely higher attacker, and his attacks cluster on character (ideology, wealth, career politician). Sand attacks less often but returns repeatedly to one character attack (residency). Test this prediction in Module 08, then ask whether a single debate segment is enough data to generalize.' },
  { name: 'Identification', who: 'Kenneth Burke',
    idea: 'Persuasion works through identification: the speaker becomes "consubstantial" with the audience by sharing their identity, values, and story.',
    key: 'Division is the flip side. Attacks often try to break an opponent\'s identification with the audience.',
    prompt: 'Find one identification move from each candidate and one attempt at division.',
    model: 'Identification: Sand\'s "born and raised in Decorah... hunting, fishing, going to church"; Lahn\'s "sixth-generation Iowan... my dad was a pastor." Division: Sand\'s "change of address candidate" tries to separate Lahn from Iowans; Lahn\'s "billionaire family" and "career politician" try to separate Sand from ordinary voters.' },
  { name: 'Ideographs', who: 'Michael Calvin McGee',
    idea: 'Ideographs are abstract terms ("freedom," "family") that carry ideological force and summon commitment without precise definition.',
    key: 'The analyst traces how a term is used, contested, and filled with meaning in a specific situation.',
    prompt: 'Identify an ideograph that both candidates claim, and show how each fills it differently.',
    model: '<Family> is the clearest ideograph (McGee writes them in angle brackets); "Iowa kids" works more like a local condensation symbol that borrows its force. Lahn: "There\'s no such thing as a Republican kid or a Democrat kid. There\'s just Iowa kids," tied to parental choice and his blended family. Sand ties "kids" to public schools ("My kids go to Iowa public schools"). Same term, competing ideological content.' },
  { name: 'Narrative paradigm', who: 'Walter Fisher',
    idea: 'People judge persuasion as stories, by narrative coherence (does it hang together?) and fidelity (does it ring true to my experience?), more than by formal logic.',
    key: 'A story can persuade even when its statistics fail, if it fits the audience\'s lived experience.',
    prompt: 'Why might an appearance-based endorsement persuade some readers even though it has no stated warrant?',
    model: 'The endorsement tells a coherent story (the composed outsider versus the polished politician) with high fidelity for readers who distrust politicians. Fisher explains its persuasive force; Toulmin explains its logical weakness. A PhD-level analysis holds both at once rather than dismissing the audience.' },
  { name: 'Rhetorical situation', who: 'Lloyd Bitzer & Richard Vatz',
    idea: 'Bitzer: discourse responds to a situation\'s exigence, audience, and constraints. Vatz: rhetors create situations by choosing what is salient.',
    key: 'The debate format sets the questions, but candidates decide what the debate is "about."',
    prompt: 'Did the residency issue arise from the situation, or did the candidates make it salient?',
    model: 'No scheduled question was about residency. It surfaced inside the education segment, when Sand said Lahn doesn\'t "spend enough time in Iowa"; the moderator\'s accessibility question came only afterward ("since you brought it up"). That supports Vatz: Sand made residency salient, and Lahn amplified it by insisting on responding immediately. Bitzer still helps explain why it resonated: an open-seat race creates an exigence about who is "one of us."' },
  { name: 'Audience adaptation and pathos', who: 'Perelman & Olbrechts-Tyteca; Aristotle',
    idea: 'Arguments are built for a particular audience. Pathos, the appeal to emotion, is a legitimate mode of proof when the emotion fits the facts; it becomes manipulation when it replaces them.',
    key: 'Separate what the text shows (the appeal) from what it cannot show (the speaker\'s intended audience or private strategy).',
    prompt: 'Lahn repeatedly invokes children: his own, "your children," "Iowa kids," a seven-year-old boy told something is wrong with him. Was he targeting mothers? What can the transcript support, and what can it not?',
    model: 'The transcript supports a sustained parental appeal: "I will also defend your children from people who\'d like to exploit them like Rob Sand" addresses parents directly and turns a residency question into a protective one. It does not show the appeal was aimed at women specifically. Nothing in the text is addressed to mothers, and his "COVID Karen" line uses a gendered insult that could alienate the very voters the claim assumes he courted. A defensible reading: Lahn adapted to an audience of parents and used protective pathos to reframe an attack. Claiming he targeted women would need outside evidence, such as ad targeting, campaign statements, or polling by gender.' },
  { name: 'Ethos and image', who: 'Aristotle; Benoit\'s image repair',
    idea: 'Ethos is credibility built from practical wisdom, virtue, and goodwill. Image repair studies how speakers defend reputations under attack. Benoit\'s five strategies: denial, evasion of responsibility, reducing offensiveness, corrective action, and mortification.',
    key: 'Defenses can be categorized and judged for fit with the accusation.',
    prompt: 'Which image-repair strategy does Lahn use on the residency attack, and which does Sand use on the auditor-budget attack?',
    model: 'Lahn combines simple denial ("central lie") with three forms of reducing offensiveness: bolstering (sixth-generation Iowan), transcendence (this is about my children), and attacking the accuser. Sand uses denial by shifting blame ("my predecessor burned through the state\'s accounts") plus corrective action ("we righted that within our first year").' }
];

/* ---------- 08 BENOIT CODING ---------- */
window.FUNCTIONS = ['Acclaim', 'Attack', 'Defense'];
window.TOPICS = ['Policy', 'Character'];
window.BENOIT = [
  { who: 'Sand', q: '"I think one of the things that we could do is cap the fees that utilities are charging their users."', f: 'Acclaim', t: 'Policy', note: 'Future plan.' },
  { who: 'Lahn', q: '"I\'ve called to eliminate all tax breaks from data centers and instead prioritize... Iowa\'s homegrown companies."', f: 'Acclaim', t: 'Policy', note: 'Future plan.' },
  { who: 'Lahn', q: '"That\'s a radical statement because Rob is a radical liberal."', f: 'Attack', t: 'Character', note: 'Ideals.' },
  { who: 'Sand', q: '"No. And that\'s been fact checked and called false."', f: 'Defense', t: 'Policy', note: 'Rebuts a policy attack on taxes.' },
  { who: 'Lahn', q: '"The truth is, I\'m a sixth-generation Iowan. I live in Iowa today."', f: 'Defense', t: 'Character', note: 'Rebuts a character attack on residency.' },
  { who: 'Sand', q: '"You registered to vote in Iowa less than two years ago."', f: 'Attack', t: 'Character', note: 'Personal qualities and ties, not a policy record.' },
  { who: 'Lahn', q: '"The first year Rob Sand was auditor, he overspent his budget, had to get bailed out by the governor."', f: 'Attack', t: 'Policy', note: 'Past deeds in office count as policy in Benoit\'s scheme.' },
  { who: 'Sand', q: '"My predecessor burned through the state\'s accounts in the auditor\'s office and we righted that within our first year."', f: 'Defense', t: 'Policy', note: 'Defends a past deed.' },
  { who: 'Sand', q: '"One of the things that\'s really important to me is actually bringing people together in this campaign."', f: 'Acclaim', t: 'Character', note: 'Ideals.' },
  { who: 'Lahn', q: '"Iowa needs to be the first state in the country that has non-punitive off-ramps for these kids."', f: 'Acclaim', t: 'Policy', note: 'Future plan.' },
  { who: 'Lahn', q: '"He doesn\'t know what he\'s talking about because he\'s a career politician."', f: 'Attack', t: 'Character', note: 'Leadership ability.' },
  { who: 'Sand', q: '"I\'ve proposed that we make sure that home inspectors... have in writing proof... that they told them Iowa has the highest radon levels."', f: 'Acclaim', t: 'Policy', note: 'Future plan.' },
  { who: 'Lahn', q: '"He outspent his opponent 30 to 1... He bought an election."', f: 'Attack', t: 'Character', note: 'Personal qualities and integrity.' },
  { who: 'Sand', q: '"He\'s got platitudes that show that he doesn\'t have the demonstrated knowledge or experience."', f: 'Attack', t: 'Character', note: 'Leadership ability.' }
];

/* ---------- 09 RESEARCH ---------- */
window.RQ = {
  theories: [
    { id: 'pd', label: 'Pragma-dialectics', lit: 'van Eemeren & Grootendorst; van Eemeren on strategic maneuvering' },
    { id: 'walton', label: 'Walton\'s argumentation schemes', lit: 'Walton, Ad Hominem Arguments; Walton, Reed & Macagno, Argumentation Schemes' },
    { id: 'benoit', label: 'Benoit\'s functional theory', lit: 'Benoit, Communication in Political Campaigns; Benoit\'s debate studies' },
    { id: 'burke', label: 'Burkean identification', lit: 'Burke, A Rhetoric of Motives' },
    { id: 'fisher', label: 'Fisher\'s narrative paradigm', lit: 'Fisher, Human Communication as Narration' }
  ],
  phenomena: [
    { id: 'res', label: 'residency as a stand-in for character', text: 'candidates use residency and place-based belonging as a proxy for character' },
    { id: 'fam', label: 'attacks on family wealth', text: 'candidates frame an opponent\'s family wealth as evidence of unfitness' },
    { id: 'fact', label: 'live contestation of facts', text: 'candidates contest factual claims in real time, including citing fact-checks on stage' },
    { id: 'look', label: 'appearance-based endorsements', text: 'audiences justify candidate preference through appearance and bearing' }
  ],
  methods: [
    { id: 'close', label: 'Close textual reading', text: 'a close reading of the KWQC transcript, focused on key exchanges' },
    { id: 'content', label: 'Content analysis', text: 'a content analysis coding every utterance, with a second coder and an intercoder reliability check' },
    { id: 'recon', label: 'Argument reconstruction', text: 'a reconstruction of each argument, tested against the theory\'s critical standards' },
    { id: 'comp', label: 'Comparative case study', text: 'a comparison across all four 2026 Sand–Lahn debates' }
  ]
};

window.READINGS = [
  { t: 'A Rulebook for Arguments', a: 'Anthony Weston', lvl: 'I', why: 'Short and practical. Read first.' },
  { t: 'The Uses of Argument', a: 'Stephen Toulmin', lvl: 'I', why: 'The origin of claim, data, and warrant.' },
  { t: 'Argumentation and Debate', a: 'Freeley & Steinberg', lvl: 'II', why: 'Standard college text: flowing, burden of proof, refutation.' },
  { t: 'Rhetoric', a: 'Aristotle', lvl: 'II', why: 'Ethos, pathos, logos, and the foundations of the field.' },
  { t: 'A Systematic Theory of Argumentation', a: 'van Eemeren & Grootendorst', lvl: 'III', why: 'The ten rules of critical discussion.' },
  { t: 'Ad Hominem Arguments', a: 'Douglas Walton', lvl: 'III', why: 'When personal attacks are and are not fallacious.' },
  { t: 'Communication in Political Campaigns', a: 'William Benoit', lvl: 'III', why: 'Functional theory: acclaims, attacks, defenses.' },
  { t: 'The New Rhetoric', a: 'Perelman & Olbrechts-Tyteca', lvl: 'III', why: 'Argument as adaptation to an audience.' },
  { t: 'A Rhetoric of Motives', a: 'Kenneth Burke', lvl: 'III', why: 'Identification and division.' },
  { t: 'Presidential Debates', a: 'Jamieson & Birdsell', lvl: 'III', why: 'The history and function of televised debate.' }
];

/* ---------- LEVEL IV: PHILOSOPHY PhD TRACK ---------- */
window.COURSE.push({ level: 'IV', name: 'Philosophy PhD', sub: 'Filling the gaps for doctoral study', modules: ['logic', 'gaps'] });
window.MODULES.logic = { n: '10', title: 'Formal Logic from the Debate', short: 'Formal logic', mins: 20 };
window.MODULES.gaps = { n: '11', title: 'Your Gap Map', short: 'Gap map', mins: 15 };

window.FORMS = ['Modus ponens', 'Modus tollens', 'Disjunctive syllogism', 'Affirming the consequent', 'Undistributed middle'];
window.FORM_DEFS = {
  'Modus ponens': ['P → Q, P ∴ Q', 'Valid'],
  'Modus tollens': ['P → Q, ¬Q ∴ ¬P', 'Valid'],
  'Disjunctive syllogism': ['P ∨ Q, ¬P ∴ Q', 'Valid'],
  'Affirming the consequent': ['P → Q, Q ∴ P', 'Invalid'],
  'Undistributed middle': ['All A are B, x is B ∴ x is A', 'Invalid']
};
window.LOGIC = [
  { who: 'Lahn', src: 'econ', time: '2:54', arg: 'If incentives are paid only after the jobs exist, the deal protects taxpayers. The incentives are paid only after the jobs exist. So the deal protects taxpayers.',
    form: 'Modus ponens', valid: 'Valid', sym: 'P → Q, P ∴ Q',
    why: 'Valid. Whether it is sound depends on the first premise: back-loaded incentives reduce risk but do not guarantee protection. Valid form, contestable premise.' },
  { who: 'Sand', src: 'edu', time: '14:45', arg: 'If Lahn lives in Kansas, he votes in Kansas. He voted in Kansas. So he lives in Kansas.',
    form: 'Affirming the consequent', valid: 'Invalid', sym: 'P → Q, Q ∴ P',
    why: 'Invalid. Past Kansas voting is consistent with having since moved. This is the formal shape of the unmet burden of proof from Module 03.' },
  { who: 'Lahn', src: 'edu', time: '4:29', arg: 'If money drove results, rising spending would raise Iowa\'s ranking. Spending rose and the ranking fell. So money does not drive results.',
    form: 'Modus tollens', valid: 'Valid', sym: 'P → Q, ¬Q ∴ ¬P',
    why: 'Valid. The weak point is the conditional. Money could drive results while other factors pulled rankings down (a ceteris paribus problem). And a ranking is relative: other states raised spending too, so Iowa could improve in absolute terms and still fall in rank.' },
  { who: 'Social post', src: null, time: null, arg: 'Strong leaders look composed under pressure. Lahn looked composed under pressure. So Lahn is a strong leader.',
    form: 'Undistributed middle', valid: 'Invalid', sym: 'All A are B, x is B ∴ x is A',
    why: 'Invalid. Many people who look composed are not strong leaders. The middle term "looks composed" never covers the whole class.' },
  { who: 'Sand', src: 'econ', time: '12:47', arg: 'A tax cut is paid for either by cutting services or by raising taxes somewhere else. Lahn says he will not raise taxes. So his tax cut means cutting services.',
    form: 'Disjunctive syllogism', valid: 'Valid', sym: 'P ∨ Q, ¬P ∴ Q',
    why: 'Valid, but Lahn attacks the disjunction itself: drawing down the $4 billion Taxpayer Relief Fund is a third option. A valid argument with a false premise is unsound. This is how a false dilemma works formally.' },
  { who: 'Lahn', src: 'health', time: '1:58', arg: 'If nitrates are driving Iowa\'s cancer rate, high-nitrate places will have high cancer rates. Iowa has high nitrates and high cancer rates. So nitrates are driving Iowa\'s cancer rate.',
    form: 'Affirming the consequent', valid: 'Invalid', sym: 'P → Q, Q ∴ P',
    why: 'Invalid. The moderator supplied the counterexample: agrarian neighbors without the same cancer rates. Correlation fits the consequent but does not establish the antecedent.' }
];

window.UIOWA = {
  areas: [
    { id: 'me', name: 'Metaphysics and epistemology', what: 'Knowledge, justification, testimony, causation, personal identity, free will.', start: 'Feldman, Epistemology; Loux, Metaphysics: A Contemporary Introduction', link: 'Testimony and fact-checking: when should a voter trust a candidate\'s statistic?' },
    { id: 'hist', name: 'History of philosophy', what: 'Ancient (Plato, Aristotle) and early modern (Descartes, Hume, Kant) at minimum.', start: 'Plato, Gorgias; Aristotle, Rhetoric; Hume, Enquiry', link: 'Plato\'s Gorgias is the founding critique of persuasion without knowledge.' },
    { id: 'logic', name: 'Logic and philosophy of science', what: 'Propositional and predicate logic, proofs, validity; explanation and evidence.', start: 'Bergmann, Moor & Nelson, The Logic Book; Godfrey-Smith, Theory and Reality', link: 'Module 10 is your on-ramp. Doctoral programs expect proofs in predicate logic.' },
    { id: 'ethics', name: 'Ethics', what: 'Normative theories (consequentialism, deontology, virtue) and metaethics.', start: 'Rachels, The Elements of Moral Philosophy; Shafer-Landau, The Fundamentals of Ethics', link: 'The ethics of deception: is a misleading-but-true claim a lie?' },
    { id: 'value', name: 'Value theory', what: 'Political philosophy, social philosophy, aesthetics.', start: 'Rawls, Political Liberalism (selections); Wolff, An Introduction to Political Philosophy', link: 'Public reason: what kinds of arguments are legitimate in democratic debate?' }
  ],
  materials: [
    'Online application to the Graduate College and fee',
    'Statement of purpose',
    'Sample of philosophical writing',
    'Three letters of recommendation',
    'Unofficial transcripts'
  ]
};

/* ---------- 05 VIRAL POST ---------- */
window.TIERS = ['Primary record', 'Original news reporting', 'Partisan or advocacy source', 'No source'];
window.VIRAL_VERDICTS = ['Accurate', 'Partly wrong', 'Unsupported'];
window.VIRAL = [
  { claim: 'He "re-registered his voting address in Iowa on October 17, 2024," just meeting the two-year residency requirement.', verdict: 'Accurate', tier: 'Original news reporting',
    why: 'Kansas Reflector and Iowa Starting Line report the date from voter registration records. The voter file itself is the primary record; the reporting is the best source a reader can reach quickly.', src: 'Iowa Starting Line', url: 'https://iowastartingline.com/news/meet-zach-lahn-koch-political-operative-iowa-governor/' },
  { claim: 'He cast votes "in Kansas elections through the 2018, 2020, and 2022 election cycles."', verdict: 'Accurate', tier: 'Original news reporting',
    why: 'PolitiFact checked Kansas Secretary of State records: the 2018 and 2020 general elections and the August 2022 primary.', src: 'PolitiFact', url: 'https://politifact.com/article/2026/oct/06/zach-lahn-rob-sand-iowa-governor-midterm-elections/' },
  { claim: 'He and his current wife married "days after her divorce decree was finalized."', verdict: 'Partly wrong', tier: 'Primary record',
    why: 'The Sedgwick County District Court docket, searchable on Kansas CaseSearch, shows his divorce decree signed June 8, 2020. Reporting says the couple applied for a Montana marriage license 11 days after his divorce, not hers, and the wedding date itself is not public. A license application is not a wedding.', src: 'Kansas CaseSearch', url: 'https://casesearch.kscourts.gov/' },
  { claim: 'A specific, serious allegation about events in his private life in 2019.', verdict: 'Unsupported', tier: 'No source',
    why: 'No news outlet that covered the marriages reports it, and the court docket does not address it. The burden of proof sits with whoever makes the claim. The responsible move is to ask the sender for a source and, absent one, not repeat it. Repeating an unsourced allegation spreads it even when you mean to question it.', src: null, url: null },
  { claim: 'He "relocated to Montana" from 2012 to 2015.', verdict: 'Partly wrong', tier: 'Original news reporting',
    why: 'He managed Steve Daines\'s campaign from 2011, became his state director in 2013, and led Americans for Prosperity Montana from 2014. But USA Today reports he moved back to Iowa in 2013 and lived there while running the Montana operation, and the same post says he was in Iowa in 2013 and 2014. Overlapping date ranges inside one post are a red flag.', src: 'USA Today', url: 'https://www.usatoday.com/story/news/politics/2026/10/07/zach-lahn-iowa-governor-campaign/92126454007/' },
  { claim: 'He worked on Iowa congressional campaigns, "including managing David Young\'s."', verdict: 'Accurate', tier: 'Original news reporting',
    why: 'He managed Young\'s campaign from July 2013 to July 2014 and also worked for Matt Schultz in 2014.', src: 'Iowa Starting Line', url: 'https://iowastartingline.com/news/meet-zach-lahn-koch-political-operative-iowa-governor/' },
  { claim: 'His wife is "a Koch heiress."', verdict: 'Partly wrong', tier: 'Original news reporting',
    why: 'She married into the Koch family in 2010 and divorced in 2020; she was born Annie Breitenbach and worked as a neonatal nurse. "Former daughter-in-law of Charles Koch" is accurate; "heiress" implies an inheritance no source documents.', src: 'Politico', url: 'https://www.politico.com/magazine/story/2018/12/14/koch-brothers-chase-charles-next-generation-223099' },
  { claim: 'He "launched a gubernatorial campaign built on conservative family values."', verdict: 'Accurate', tier: 'Original news reporting',
    why: 'At his launch he said Iowa\'s future "depends on strong families, small towns, faith and hard work" and promised to strengthen marriage. "Built on" is a characterization, but a fair one; his campaign also centers cancer, water and taxes.', src: 'The Gazette', url: 'https://www.thegazette.com/campaigns-elections/zach-lahn-joins-crowded-republican-field-for-governor-with-iowa-first-message/' }
];
window.SOURCE_LADDER = [
  { t: 'Primary record', d: 'Court dockets, voter files, property deeds, campaign finance filings, the debate video itself.' },
  { t: 'Original news reporting', d: 'Journalists who examined the records and name them. Check whether they cite the record or another outlet.' },
  { t: 'Aggregators', d: 'Sites summarizing someone else\'s reporting. Trace the claim back to whoever did the original work.' },
  { t: 'Partisan or advocacy sources', d: 'Party and campaign sites. Often accurate on records, selective on framing. Verify before citing.' },
  { t: 'No source', d: 'Forwarded posts, screenshots, "I heard." Not evidence until it can be traced.' }
];
window.OPINION_PAIRS = [
  { x: 'He voted in Kansas in 2018, 2020 and 2022.', key: 'Fact' },
  { x: 'He wants the title more than the work.', key: 'Opinion' },
  { x: 'Iowa deserves a full-time governor.', key: 'Opinion' },
  { x: 'His plane made 37 trips to Wichita in about seven months.', key: 'Fact' },
  { x: 'That doesn\'t look like someone who came home for Iowa.', key: 'Opinion' }
];
