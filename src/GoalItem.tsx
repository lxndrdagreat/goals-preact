import { h } from 'preact';
import './GoalItem.css';
import checkeredFlag from './checkered-flag.svg';
import classnames from 'classnames';

interface GoalItemProps {
  goalId: number;
  title: string;
  occurred: boolean;
  onTap: () => void;
}

function GoalItem({ goalId, title, occurred, onTap }: GoalItemProps) {
  return (
    <li
      className={classnames('GoalItem', {
        occurred: occurred,
      })}
    >
      <button type="button" onClick={onTap}>
        {title}
        <img src={checkeredFlag} alt="" />
      </button>
    </li>
  );
}

export default GoalItem;
