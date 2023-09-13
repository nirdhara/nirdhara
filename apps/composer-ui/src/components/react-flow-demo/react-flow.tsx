'use client';
import { Controls, Background, ReactFlow } from 'reactflow';

const nodes: any = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];

const OverviewFlow = () => {
  return (
    <div style={{ height: 800 }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
