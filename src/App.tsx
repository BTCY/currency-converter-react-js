import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { RoutesData } from './routes/routes';

function App() {

    return (
        <Routes>
            {/* data from ./routes/routes.tsx */}
            {RoutesData && Object.keys(RoutesData).map((key: string) =>
                <Route
                    key={RoutesData[key].link}
                    path={RoutesData[key].link}
                    element={RoutesData[key].component}
                />
            )}
        </Routes>
        // <div className="App">
        //     <header className="App-header">
        //         <Counter />
        //     </header>
        // </div>
    );
}

export default App;
