import { Layout } from './components/Layout';
import { NoteForm } from './features/notes/components/NoteForm';
import { NoteList } from './features/notes/components/NoteList';

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        <NoteForm />
        <NoteList />
      </div>
    </Layout>
  );
}

export default App;
