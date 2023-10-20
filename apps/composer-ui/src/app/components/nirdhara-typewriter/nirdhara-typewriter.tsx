import React from 'react';
import styles from './nirdhara-typewriter.module.scss';

// Credits: https://css-tricks.com/snippets/css/typewriter-effect/

export default function NirdharaTypewriter() {
  return (
    <div className={styles['typewriter']}>
      <h1 className="text-xl">Hey 👋, this is Nirdhara, an open source no-code solution to build LLM powered apps</h1>
    </div>
  );
}
