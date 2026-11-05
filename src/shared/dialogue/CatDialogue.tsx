import { CatCharacter } from '../characters/CatCharacter';
import './dialogue.css';

interface CatDialogueProps {
  text: string;
  speaker?: string;
}

export function CatDialogue({
  text,
  speaker = 'Никита · твой Иксик',
}: CatDialogueProps) {
  return (
    <span className="cat-dialogue" role="note">
      <span className="cat-dialogue-avatar">
        <CatCharacter character="white" />
      </span>
      <span className="cat-dialogue-bubble">
        <span className="cat-dialogue-speaker">{speaker}</span>
        <span className="cat-dialogue-text">{text}</span>
      </span>
    </span>
  );
}
