'use client';
import { observer } from 'mobx-react';
import NirdharaTypewriter from './components/nirdhara-typewriter';

function Home() {
  return (
    <div className="h-full / flex flex-col justify-center items-center">
      <NirdharaTypewriter />
    </div>
  );
}
export default observer(Home);
