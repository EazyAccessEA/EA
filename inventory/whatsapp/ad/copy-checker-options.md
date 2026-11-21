# Copy-checker options: alternatives and complements to slopmonster

Research date: 19 Nov 2026. Read-only: nothing was installed or run. Versions and stars come from the GitHub API on that date; prices come from third-party pages unless marked, so check them on the vendor's own page before paying.

## What slopmonster already does

- `deslop.py`: a regex catalogue (AI vocabulary matched by root, constructions such as "not just X but Y", em-dash and punctuation cadence, rule-of-three rhythm, invented proof numbers), scored 0–5, offline, with unit tests.
- `cleanse.sh`: a rewrite by a rival model (Codex, which sends the text to OpenAI).
- `judge.sh`: two blind LLM readers (Claude and GPT) giving fault and stumble verdicts.
- Its stated view (SKILL.md, README, references/sources.md) is that "detectors are noise" and passing one is not the goal.

**The gap:** none of the three parts has a measured precision or recall. A 5/5 score tells you no rule fired. It doesn't tell you how often the rules fire on human copy, or how often they miss AI copy. None of the candidates below publishes that figure for marketing copy either, which is why the shortlist ends in a labelled test.

## Comparison

| Tool | Detects | Rigour / validation | Offline? | Install and size | Licence | Last release | CI | Custom rules |
|---|---|---|---|---|---|---|---|---|
| **Vale** (vale.sh) | Whatever its styles define: tokens, regex, sequences, sentence length, readability | The engine is deterministic and well tested. Accuracy depends on the style package. Thoughtworks Radar lists it as a tool | Yes | Single Go binary (`brew install vale`), roughly tens of MB | MIT | v3.28.1, 19 Nov 2026 | Yes: exit codes, GitHub Action, reviewdog | Yes, YAML rules (existence, substitution, occurrence, sequence, script) |
| **vale-ai-tells** (tbhb) | 134 rules for AI tells: vocabulary verbs, parallel staccato, figurative verbs and nouns, em-dash habits, epigrams, triads | No published precision or recall. The README says rules were cut for "too many false positives" and are refined from corpus audits. The rules are tuned on docs and commit prose, not sales copy | Yes | `vale sync` downloads a zip of YAML | MIT | v1.37.0, 15 Sep 2026; pushed 3 Nov 2026; 137 stars | Yes (via Vale) | Yes; fork the rules or add your own |
| Other Vale AI styles | "AiTells" on the Vale explorer (claims "benchmarked rules"); ammil industries ruleset from Wikipedia's "Signs of AI writing"; krishnasunkam/vale-ai-tells | Benchmark claim not verified; no numbers found | Yes | `vale sync` | MIT / CC BY-SA | Not checked | Yes | Yes |
| Vale packages Microsoft, Google, proselint, write-good, alex, Readability | House style, wordiness, passive voice, weasel words, insensitive terms, Flesch/Gunning scores | Style guides, not validated detectors of AI text | Yes | `vale sync` | MIT and others | Maintained by the Vale project | Yes | Yes |
| **LanguageTool** | Grammar, spelling, style; a few wordiness rules. No AI-tell rules | Mature grammar checker; no AI-tell validation | Local server: yes. Cloud API: sends text to LanguageTool GmbH | Java 17+ (openjdk@17 is already on this Mac). Community Docker image ~310–334 MB; the optional English n-gram data is ~8 GB | LGPL-2.1 | 6.8 stable (May 2026) | Yes, via HTTP | Yes, XML rules (harder to write than Vale) |
| **proselint** | Clichés, jargon, redundancy, typography | Its authors argue for a low false-alarm rate; no AI-text numbers | Yes | `pip`/`uv tool`, small | BSD-3 | v0.16.0, 14 Nov 2025 | Yes | Limited (Python checks) |
| **write-good** | Passive voice, weasel words, "there is", adverbs | Describes itself as a "naive linter" | Yes | npm, small | MIT | Last push Mar 2025; dormant | Yes | Limited |
| **textlint** + `@textlint-ja/textlint-rule-preset-ai-writing` | AI writing patterns, **Japanese only** | None published | Yes | npm | MIT | textlint v16.1.1 (17 Nov 2026); preset pushed Jun 2026, 1.2k stars | Yes | Yes (JS rules) |
| **textstat** (Python) | Readability: Flesch, FK grade, sentence length, syllables | Standard formulas; they measure difficulty, not AI-ness | Yes | `pip`, small (depends on pyphen) | MIT | Pushed 26 Oct 2026; 1.4k stars | Yes (as a script) | n/a: features you can threshold yourself |
| **Pangram** | AI-written probability | The best independent evidence of any detector: Jabarian and Imas (Chicago Booth / NBER w34223, 2025) found near-zero false positives and the only tool under a 0.5% FPR cap. False positives rise slightly on short passages; no published figure for text under ~50 words | **No: sends text to Pangram** | Web or API, nothing to install | Proprietary | SaaS (raised $13M; v4 model) | API | No |
| **GPTZero** | AI-written probability | Did worse than Pangram in the same study; disputes rankings | No: sends text off-machine | Web/API; third-party listing: API from $45/mo for 300k words; free 10k words/mo | Proprietary | SaaS | API | No |
| **Originality.ai** | AI probability, plagiarism | Vendor numbers; weaker in independent tests | No: sends text off-machine | Web; ~$0.01 per 100 words pay-as-you-go; API only on Enterprise (~$179/mo) | Proprietary | SaaS | Enterprise API | No |
| **Binoculars** (open source) | Zero-shot perplexity / cross-perplexity score | ICML 2024: over 90% of ChatGPT text caught at 0.01% FPR on news, essays and creative writing. Nothing on short marketing copy, and accuracy drops on short text | Yes | Two 7B Falcon models (~28 GB of weights; GPU or a lot of RAM) | BSD-3 | Repo last pushed May 2024 | Possible but heavy | No |
| **Human panel: Lyssna** (ex UsabilityHub) | Whether real readers trust it, find it clear, or say it "sounds AI"; five-second and preference tests | Real people: the true label for "reads as AI" | No: copy goes to panellists | Web; plans ~$165–199/mo; panel ~1 credit (~$1) per minute per participant, more for screeners; free plan allows a few self-recruited responses. Prices are in USD, with no UK-specific pricing found | Proprietary | SaaS | No | n/a |
| **skills.sh skills** | blader/humanizer (71k GitHub stars, built on Wikipedia's "Signs of AI writing") and many forks; iliaal/ai-skills "writing" | Prompt-only rewrite and audit skills; no measurement | Depends on the model | `npx skills add blader/humanizer` (not run) | MIT | Pushed 19 Nov 2026 | No | Prompt edits |

Note: the vale-ai-tells repository's own GitHub description is a deliberate parody of AI slop. It is not a sign of quality either way.

## Findings

1. **No linter publishes precision or recall for AI tells.** vale-ai-tells is the most developed rule set and is actively maintained. It is regex-and-sequence matching, the same method as deslop.py, with about four times as many rules, and it is tuned on docs and commit prose rather than sales copy.
2. **Pangram is the only detector with independent validation.** It sends text off-machine. Short copy (ad lines, a WhatsApp ad) is its weakest case. It fits as a measuring instrument on a test set, not as a ship gate, which matches slopmonster's own stance.
3. **Grammar and style tools (LanguageTool, proselint, write-good, alex) don't find AI tells.** They are a separate quality check. LanguageTool is the heaviest of these to install.
4. **A human panel is the only real ground truth** for "a reader thinks this sounds AI", and it costs money for each test.

## Shortlist to test

Labelled set: at least 20 human passages and 20 AI passages, all of them marketing copy of a similar length. Use human copy dated before 2022, so no model could have written it, plus our own AI drafts from before they were cleaned up. Score every tool on the same set and report precision, recall and the false-positive rate on human copy. deslop.py is the baseline.

1. **Vale + vale-ai-tells (primary candidate).** Offline, free, runs in CI, and its rules are YAML, so the deslop.py catalogue can be ported into the same engine. Watch for false positives on short sales lines.
   ```bash
   brew install vale
   # then in the test folder, .vale.ini:
   #   StylesPath = styles
   #   MinAlertLevel = suggestion
   #   Packages = https://github.com/tbhb/vale-ai-tells/releases/download/v1.37.0/ai-tells.zip
   #   [*.md]
   #   BasedOnStyles = ai-tells
   vale sync
   ```
   Pin the release URL rather than the bare `ai-tells` name, so that `vale sync` can't pull a new version without anyone noticing. The asset name `ai-tells.zip` is inferred from the README pattern, so confirm it on the v1.37.0 release page before running.
2. **Pangram, as a reference instrument only.** It is the one detector with an independent false-positive figure, so it shows whether deslop.py and Vale agree with a validated classifier. It sends text to Pangram, so use it only on the published or public test passages, never on unpublished drafts or enquiry content. It needs an account, which the owner would have to create. Nothing to install; use the web app or API with an API key.
3. **textstat (cheap complement, optional).** It adds sentence-length variance and readability features that deslop.py's cadence check only approximates. Offline and a few hundred KB.
   ```bash
   uv venv ~/.venvs/copycheck && uv pip install --python ~/.venvs/copycheck textstat
   ```

Human panel (Lyssna): use it once, after the test, to check the final pick on real readers. For example, a preference test between the deslop-clean and Vale-clean versions of one ad. On the third-party prices above, budget roughly $1–3 per response, plus a plan unless the free tier's self-recruited responses are enough. Check GBP pricing at lyssna.com/pricing.

Not shortlisted: LanguageTool (grammar, not AI tells; heavy), write-good (dormant), the textlint AI preset (Japanese only), Binoculars (~28 GB of models and unproven on short copy), GPTZero and Originality.ai (send text away, weaker independent results than Pangram), and the humanizer skills (rewriters, not measurement).

## Sources

- Vale releases: https://github.com/errata-ai/vale (API, v3.28.1)
- vale-ai-tells: https://github.com/tbhb/vale-ai-tells and https://vale.sh/explorer/ai-tells
- Vale AiTells listing: https://vale.sh/explorer/AiTells
- ammil industries ruleset: https://ammil.industries/signs-of-ai-writing-a-vale-ruleset
- Thoughtworks Radar on Vale: https://www.thoughtworks.com/radar/tools/vale
- textlint AI preset: https://github.com/textlint-ja/textlint-rule-preset-ai-writing
- proselint: https://github.com/amperser/proselint ; write-good: https://github.com/btford/write-good ; textstat: https://github.com/textstat/textstat
- LanguageTool: https://en.wikipedia.org/wiki/LanguageTool ; https://dev.languagetool.org/roadmap ; https://hub.docker.com/r/elestio/languagetool
- Pangram study: https://www.nber.org/system/files/working_papers/w34223/w34223.pdf ; https://bfi.uchicago.edu/wp-content/uploads/2025/09/BFI_WP_2025-116.pdf
- Binoculars: https://arxiv.org/abs/2401.12070 ; https://github.com/ahans30/Binoculars
- GPTZero / Originality pricing (third party): https://www.activepieces.com/blog/originalityai-pricing-plans-and-credit-costs-2026 ; https://www.softwares.com/software/gptzero/pricing
- Lyssna pricing (third party): https://cleverx.com/blog/lyssna-pricing-plans-explained-2026 ; official: https://www.lyssna.com/pricing
- Humanizer skill: https://github.com/blader/humanizer ; https://skills.sh/mkabumattar/skills/humanizer
