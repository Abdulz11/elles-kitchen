import Main from "./components/Main"
import Nav from "./components/Nav";
import AppContextProvider from "./contexts/Appcontext";



function App() {
  
  

  return (
    <div className="App">
      <AppContextProvider>
        <Nav />
        <Main />
      </AppContextProvider>

    </div>
  );
}

export default App;
