import {h} from 'preact';
import './InfoPage.css';

function InfoPage() {
  return (
    <div class="InfoPage">
      <h2>Basics</h2>

      <p>
        This is a simple goal tracking app that might look similar to a "to do"
        app. In this app, the goals are something you repeatedly work
        towards.
      </p>

      <p>
        It's simple:
        <ol>
          <li>
            Create a weekly or daily goal. This is how often the goal <em>occurs</em>.
          </li>
          <li>
            During each occurrence period you will need to mark the goal as complete.
          </li>
          <li>
            How well you've been doing with the goal is shown on the right-hand
            side.
          </li>
        </ol>
      </p>

    </div>
  );
}

export default InfoPage;
