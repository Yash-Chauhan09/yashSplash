import './App.css';
import Body from './components/Body';
import Cards from './components/Cards';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
     <Header />
     <Body />
     <div id='images' className="app__cards">
       <Cards img='https://images.unsplash.com/photo-1619856782185-f6d92ffa77e7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
       <Cards img='https://images.unsplash.com/photo-1619795566399-b589635c7b27?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
       <Cards img='https://images.unsplash.com/photo-1619795080845-d59e11988633?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
       <Cards img='https://images.unsplash.com/photo-1619795080845-d59e11988633?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
       <Cards img='https://images.unsplash.com/photo-1619795080845-d59e11988633?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
       <Cards img='https://images.unsplash.com/photo-1619795080845-d59e11988633?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
     </div>
    </div>
  );
}

export default App;
