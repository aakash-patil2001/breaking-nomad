import { useReveal } from '../hooks/useReveal';

const DAYS = [
  { day: '01', title: 'Arrival & settling in', desc: 'Pickup from Bhuntar. Keys, chai, a slow walk through the village. No agenda tonight.' },
  { day: '02', title: 'First Monday, new view', desc: 'Workspace opens at eight. Same standup, different mountains behind you.' },
  { day: '04', title: 'Village walk & old cafés', desc: 'An evening loop through Old Manali. The apple orchards, the bakery, the bridge.' },
  { day: '07', title: 'Trek to Lamadugh meadow', desc: 'First weekend. Four hours up through deodar forest. Lunch above the clouds.' },
  { day: '10', title: 'Community dinner', desc: 'One long table, Himachali food, no phones. This is where the cohort becomes a crew.' },
  { day: '14', title: 'Riverside co-working day', desc: 'We move the desks outdoors. The Beas is louder than your notifications.' },
  { day: '18', title: 'Bonfire night', desc: 'Stories, embers, someone always brings a guitar. Nobody plans this; it just happens.' },
  { day: '21', title: 'The hardest goodbye', desc: 'Checkout by noon. You will book the next one from the airport. Most people do.' },
];

const INCLUDED = [
  'Three weeks stay, twin-share homestay',
  'Dedicated workspace — tested wifi & backup power',
  'Two community dinners every week',
  'Weekend treks & local experiences',
  'Airport pickup from Bhuntar',
  'On-ground community host',
];

const NOT_INCLUDED = ['Flights to Bhuntar / Chandigarh', 'Weekday lunches', 'Personal expenses', 'Travel insurance'];

export default function Itinerary() {
  const ref = useReveal();
  return (
    <section className="itinerary" id="itinerary" data-testid="itinerary-section">
      <div className="itinerary-inner reveal" ref={ref}>
        <p className="section-label">Itinerary — Old Manali</p>
        <h2 className="itinerary-heading">Three weeks, unhurried</h2>
        <div className="itinerary-grid">
          <div className="itinerary-timeline" data-testid="itinerary-timeline">
            {DAYS.map((d) => (
              <div className="itinerary-day" key={d.day} data-testid={`itinerary-day-${d.day}`}>
                <span className="itinerary-day-num">Day {d.day}</span>
                <h3 className="itinerary-day-title">{d.title}</h3>
                <p className="itinerary-day-desc">{d.desc}</p>
              </div>
            ))}
          </div>
          <aside className="itinerary-panel" data-testid="itinerary-panel">
            <div className="itinerary-panel-block">
              <h4 className="itinerary-panel-title">What's Included</h4>
              <ul>
                {INCLUDED.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="itinerary-panel-block">
              <h4 className="itinerary-panel-title">Not Included</h4>
              <ul>
                {NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <a href="#apply" className="btn-primary" data-testid="itinerary-reserve-cta">Reserve your spot</a>
          </aside>
        </div>
      </div>
    </section>
  );
}
