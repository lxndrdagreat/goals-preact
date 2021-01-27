import { createContext } from 'preact';
import type { GoalModel } from 'goals-core';

export interface GoalAppState {
  goals: {
    daily: [GoalModel, boolean, number][];
    weekly: [GoalModel, boolean, number][];
  };
}

export const GoalContext = createContext<GoalAppState>({
  goals: {
    daily: [],
    weekly: [],
  },
});

export default GoalContext;
