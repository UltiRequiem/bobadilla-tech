import { PRICING_STEPS, TIMELINE_STEP_ID, RUSH_MULTIPLIER, FLEXIBLE_MULTIPLIER } from './constants';
import type { Selections, StepBreakdown } from './types';

export function calculateStepTotal(stepIndex: number, selections: Selections): number {
  const step = PRICING_STEPS[stepIndex];
  const stepSelections = selections[stepIndex] || [];
  let total = 0;

  stepSelections.forEach(selectionId => {
    const option = step.options.find(opt => opt.id === selectionId);
    if (option) {
      total += option.basePrice;
    }
  });

  return total;
}

export function calculateTotal(selections: Selections): number {
  let total = 0;
  let timelineMultiplier = 1;

  PRICING_STEPS.forEach((step, stepIndex) => {
    const stepSelections = selections[stepIndex] || [];

    stepSelections.forEach(selectionId => {
      const option = step.options.find(opt => opt.id === selectionId);
      if (option) {
        if (step.id === TIMELINE_STEP_ID) {
          if (selectionId === 'rush') timelineMultiplier = RUSH_MULTIPLIER;
          else if (selectionId === 'flexible') timelineMultiplier = FLEXIBLE_MULTIPLIER;
        } else {
          total += option.basePrice;
        }
      }
    });
  });

  return Math.round(total * timelineMultiplier);
}

export function getSelectedOptionsByStep(selections: Selections): StepBreakdown[] {
  return PRICING_STEPS.map((step, stepIndex) => {
    const stepSelections = selections[stepIndex] || [];
    const selectedOptions = stepSelections.map(selectionId => {
      const option = step.options.find(opt => opt.id === selectionId);
      return option ? { name: option.name, price: option.basePrice, description: option.description } : null;
    }).filter(Boolean);

    return {
      stepTitle: step.title,
      options: selectedOptions,
      total: selectedOptions.reduce((sum, opt) => sum + (opt?.price || 0), 0)
    };
  }).filter(item => item.options.length > 0);
}

export function formatSelectionsSummary(selections: Selections): string {
  const breakdown = getSelectedOptionsByStep(selections);
  return breakdown.map(section =>
    `${section.stepTitle}:\n${section.options.map(opt => `  - ${opt?.name}`).join('\n')}`
  ).join('\n\n');
}
