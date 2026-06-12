# Stabiliq Frontend Rules

## IMPORTANT

- Read only the minimum required files.
- Do not scan the entire repository unless explicitly requested.
- If a request can be answered in under 100 words, do not exceed 100 words.
- If a request can be answered with a code diff, return only the diff.
- Return only what was requested.
- Do not repeat requirements already present in the conversation.

---

## Project Context

This is a React.js application focused on:

- Resume Analysis
- Resume Optimization
- ATS Score Improvement
- LinkedIn Profile Optimization
- AI Career Guidance
- Resume Tailoring
- Job Application Optimization

The primary goal is:

- User value
- Conversion
- Performance
- Simplicity

Avoid unnecessary complexity.

---

## Response Style

- Be concise.
- Assume I am a senior engineer.
- Do not explain basic React, JavaScript, TypeScript, Redux, React Query, APIs, CSS, or frontend concepts.
- Use bullet points instead of long paragraphs.
- Avoid introductions and conclusions unless necessary.

---

## Repository Access

- Read only files required for the task.
- Do not inspect unrelated files.
- Prefer targeted file reads.
- Before reading additional files, explain why they are needed.

---

## Code Changes

- Return only modified code.
- Never regenerate complete files unless explicitly requested.
- Prefer unified git diff format.
- Preserve existing architecture.
- Preserve existing naming conventions.
- Do not rename files, components, hooks, or functions unless required.
- Do not add comments unless requested.
- Do not perform unrelated refactoring.

---

## Debugging

Always provide:

1. Root Cause
2. Evidence
3. Fix
4. Minimal Patch

When logs, API responses, React code, component trees, browser errors, network traces, or build output are provided:

- Analyze the provided data first.
- Avoid generic troubleshooting checklists.
- Rank causes by confidence percentage.
- Focus on the highest-confidence cause first.
- Explain why other causes are less likely.

---

## React Development

- Follow existing project patterns.
- Prefer functional components.
- Preserve existing architecture.
- Avoid unnecessary abstractions.
- Prefer reusable hooks when already established in the codebase.
- Keep component responsibilities clear.

---

## State Management

- Reuse existing state management patterns.
- Avoid introducing new state libraries.
- Avoid unnecessary global state.
- Prefer local state when sufficient.

---

## API Integration

- Preserve existing API contracts.
- Consider loading states.
- Consider error states.
- Consider retry behavior.
- Consider edge cases.
- Avoid unnecessary API calls.

---

## Performance

Always consider:

- Re-renders
- Bundle size
- API calls
- Network waterfalls
- Large component trees
- Expensive computations

Highlight bottlenecks when detected.

---

## AI Features

When working on:

- Resume Analysis
- ATS Score
- Resume Optimization
- LinkedIn Optimization
- AI Suggestions
- AI Feedback
- Resume Tailoring

Prioritize:

- Clarity
- Actionability
- User trust
- Fast feedback
- Conversion

Avoid overwhelming users with excessive information.

---

## UX Rules

Prioritize:

- Simplicity
- Conversion
- Clarity
- Mobile responsiveness
- Fast completion of user goals

Avoid:

- Unnecessary modals
- Excessive steps
- Overcomplicated workflows

---

## Resume Optimization UX

Focus on:

- Showing measurable improvements
- Highlighting ATS impact
- Clear before/after comparisons
- Actionable recommendations
- Easy implementation

Avoid generic career advice.

---

## LinkedIn Optimization UX

Focus on:

- Profile visibility
- Recruiter relevance
- Keyword optimization
- Actionable profile improvements

Avoid generic networking advice.

---

## Architecture

Provide:

1. Recommendation
2. Pros
3. Cons
4. Complexity

Avoid discussing multiple alternatives unless requested.

---

## Context Management

- Summarize long discussions instead of repeating them.
- Do not restate code already shown.
- Do not generate examples unless requested.
- Do not provide multiple solutions unless requested.
- Prefer the most likely solution first.

---

## Conversion Optimization

When proposing UI changes, consider:

- User activation
- Feature adoption
- Upgrade conversion
- User retention
- Completion rates

Do not optimize solely for engineering elegance.

---

## Design Changes

- Preserve existing design system.
- Reuse existing UI components.
- Avoid redesigning pages unless requested.
- Suggest minimal UI changes with maximum impact.

---

## Cost Optimization

- Reduce unnecessary API calls.
- Reduce unnecessary AI requests.
- Reuse cached responses when possible.
- Consider backend token costs when proposing frontend behavior.