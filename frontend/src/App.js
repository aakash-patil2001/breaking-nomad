import './App.css';
import { Nav } from './components/Nav';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import HowItWorks from './components/HowItWorks';
import Escapes from './components/Escapes';
import Itinerary from './components/Itinerary';
import ApplicationForm from './components/ApplicationForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bn-site" data-testid="breaking-nomad-site">
      <Nav />
      <main>
        <Hero />
        <OurStory />
        <HowItWorks />
        <Escapes />
        <Itinerary />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
