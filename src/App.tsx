import { Layout } from './components/Layout';
import { NoteForm } from './features/notes/components/NoteForm';
import { NoteList } from './features/notes/components/NoteList';

function App() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <NoteForm />
        </div>
        <div className="lg:col-span-3">
          <NoteList />
        </div>
      </div>
    </Layout>
  );
}

export default App;
