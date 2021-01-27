import { h } from 'preact';
import './GoalItem.css';
import checkeredFlag from './checkered-flag.svg';
import classnames from 'classnames';

interface GoalItemProps {
  goalId: number;
  title: string;
  occurred: boolean;
  rate: number;
  onTap: () => void;
}

function GoalItem({ title, occurred, rate, onTap }: GoalItemProps) {
  return (
    <li
      className={classnames('GoalItem', {
        occurred: occurred,
      })}
    >
      <button type="button" onClick={onTap}>
        {title} {(rate * 100).toFixed(0)}%
        <img src={checkeredFlag} alt="" />
      </button>
    </li>
  );
}

export default GoalItem;
