import { Component, ComponentChild, h } from 'preact';
import logo from './logo.svg';
import './App.css';
import GoalList from './GoalList';
import GoalContext, { GoalAppState } from './GoalContext';
import { GoalsIndexedDBService } from 'goals-storage-indexeddb';
import type { GoalUpsertData } from 'goals-core';
import { GoalOccurrence, generateTestData, GoalModel } from 'goals-core';
import AddGoal from './AddGoal';

declare global {
  interface Window {
    initDb: () => void;
  }
}

const db = new GoalsIndexedDBService();

window.initDb = () => {
  generateTestData(db);
};

class App extends Component {
  state: GoalAppState;

  constructor() {
    super();
    this.state = {
      goals: {
        daily: [],
        weekly: [],
      },
    };
  }

  componentDidMount() {
    // initial load of the data
    this.refreshList();
  }

  async refreshList() {
    const completes = await db.getGoalsWithCompleted();
    const scores = await Promise.all([
      ...completes.map(goal => db.getGoalCompletionScore(goal[0]))
    ]);
    const completesWithScores: [GoalModel, boolean, number][] = completes.map((pair, index) => {
      return [
        pair[0],
        pair[1],
        scores[index].rate
      ];
    });

    this.setState({
      ...this.state,
      goals: {
        daily: completesWithScores.filter(
          (goal) => goal[0].occurs === GoalOccurrence.Daily,
        ),
        weekly: completesWithScores.filter(
          (goal) => goal[0].occurs === GoalOccurrence.Weekly,
        ),
      },
    });
  }

  onAddGoal(goal: GoalUpsertData): void {
    db.upsertGoal(goal).then(() => {
      this.refreshList();
    });
  }

  onGoalTap(goalId: number): void {
    (async () => {
      await db.toggleGoalCompletion(goalId);
      await this.refreshList();
    })();
  }

  render(): ComponentChild {
    return (
      <div class="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <AddGoal onAdd={this.onAddGoal.bind(this)} />
        <GoalContext.Provider value={this.state}>
          <GoalList listType="daily" onItemTap={this.onGoalTap.bind(this)} />
          <GoalList listType="weekly" onItemTap={this.onGoalTap.bind(this)} />
        </GoalContext.Provider>
      </div>
    );
  }
}

export default App;
