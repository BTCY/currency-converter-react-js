import { Route, Routes } from "react-router-dom";
import { RoutesData } from './routes/routes';

const App = () => (
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
);

export default App;
