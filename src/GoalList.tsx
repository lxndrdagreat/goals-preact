import { h } from 'preact';
import { useContext } from 'preact/hooks';
import GoalContext from './GoalContext';
import GoalItem from './GoalItem';
import './GoalList.css';

interface GoalListProps {
  listType: 'daily' | 'weekly';
  onItemTap: (goalId: number) => void;
}

function GoalList({ listType, onItemTap }: GoalListProps) {
  // Create the count state.
  const { goals } = useContext(GoalContext);

  return (
    <div class="GoalList">
      <h2>{listType}</h2>
      {goals[listType].length ? (
        <ul>
          {goals[listType].map(([goal, completed]) => (
            <GoalItem
              goalId={goal.id}
              title={goal.title}
              occurred={completed}
              onTap={() => onItemTap(goal.id)}
            />
          ))}
        </ul>
      ) : (
        <em>no {listType} goals</em>
      )}
    </div>
  );
}

export default GoalList;
