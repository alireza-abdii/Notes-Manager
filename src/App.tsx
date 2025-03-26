import { Layout } from './components/Layout';
import { NoteForm } from './features/notes/components/NoteForm';
import { NoteList } from './features/notes/components/NoteList';

function App() {
  return (
    <Layout>
      <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
        <div className="lg:sticky lg:top-20">
          <NoteForm />
        </div>
        <div>
          <NoteList />
        </div>
      </div>
    </Layout>
  );
}

export default App;
