import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { GoalUpsertData } from 'goals-core';
import { GoalOccurrence } from 'goals-core';
import './AddGoal.css';

function AddGoal({ onAdd }: { onAdd: (goal: GoalUpsertData) => void }) {
  const [formState, setFormState] = useState({
    title: '',
    occurs: GoalOccurrence.Weekly,
  });

  function onOccurs(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);
    setFormState({
      ...formState,
      occurs: value,
    });
  }

  function onTitleChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    setFormState({
      ...formState,
      title: value,
    });
  }

  function onAddClick() {
    if (!formState.title.length) {
      return;
    }
    onAdd({
      ...formState,
      dateAdded: new Date(),
    });
    setFormState({
      title: '',
      occurs: GoalOccurrence.Weekly,
    });
  }

  return (
    <div class="AddGoal">
      <fieldset id="add-goal">
        <legend>add new goal</legend>
        <label for="title-input" class="hidden">
          Title
        </label>
        <input
          type="text"
          value={formState.title}
          id="title-input"
          onChange={onTitleChange}
          placeholder="a new goal"
        />

        {/* Occurs */}
        <div className="radio-tab-group">
          <div class="radio-tab">
            <input
              type="radio"
              name="occurs"
              id="occurs-weekly"
              value={GoalOccurrence.Weekly}
              onChange={onOccurs}
              checked={formState.occurs === GoalOccurrence.Weekly}
            />
            <label for="occurs-weekly">weekly</label>
          </div>
          <div class="radio-tab">
            <input
              type="radio"
              name="occurs"
              value={GoalOccurrence.Daily}
              onChange={onOccurs}
              checked={formState.occurs === GoalOccurrence.Daily}
              id="occurs-daily"
            />
            <label for="occurs-daily">daily</label>
          </div>
        </div>

        <button type="button" onClick={onAddClick}>
          add
        </button>
      </fieldset>
    </div>
  );
}

export default AddGoal;
