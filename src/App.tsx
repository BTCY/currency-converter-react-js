import { Route, Routes } from "react-router-dom";
import { RoutesData } from "./routes/routes";

const App = (): JSX.Element => (
    <Routes>
        {/* data from ./routes/routes.tsx */}
        {RoutesData && Object.keys(RoutesData).map((key: string) =>
            <Route
                key={RoutesData[key].path}
                path={RoutesData[key].path}
                element={RoutesData[key].element}
            />
        )}
    </Routes>
);

export default App;
