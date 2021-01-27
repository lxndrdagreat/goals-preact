import {h, ComponentChildren} from 'preact';
import './FloatingButton.css';

function FloatingButton({children, onClick}: {children?: ComponentChildren, onClick?: () => void}) {
  return (
    <button class="FloatingButton"
            onClick={onClick}
            type="button">
      {children}
    </button>
  );
}

export default FloatingButton;
