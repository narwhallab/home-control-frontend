import TopNav from './components/TopNav';
import './styles/App.css';

function App({child}: {child: JSX.Element}) {
  return (
    <div className="App">
      <TopNav toggleHome={() => window.location.href = "/"} toggleMenu={() => {}} />
      {child}
    </div>
  );
}

export default App;
