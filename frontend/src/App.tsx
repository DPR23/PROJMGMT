import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import GanttChart from './components/GanttChart';
import TimeTracker from './components/TimeTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="gantt" element={<GanttChart />} />
          <Route path="time-tracking" element={<TimeTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
