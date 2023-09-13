'use client';
import OverviewFlow from '@/components/react-flow-demo/react-flow';
import { observer } from 'mobx-react';
import { useRootStore } from '../../storage/app-store/root-store-provider';

function Home() {
  const { testStore } = useRootStore();
  return (
    <>
      <h1 className="text-3xl font-bold underline">{testStore._updateState.counter}</h1>

      <button
        className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
        onClick={() => testStore.UpdateCounter()}
      >
        Click Me
      </button>
      <OverviewFlow />
    </>
  );
}
export default observer(Home);
