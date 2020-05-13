import React, {Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import { routes } from './helpers/path';

const Home = lazy(() => import('./containers/Home/Home'));
const Movies = lazy(() => import('./containers/Movies/Movies'));

function App() {
  return (<>
    <Navbar/>
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path={routes.HOME}
          component={Home}/>
          <Route path={routes.MOVIES} component={Movies}/>
          <Redirect to="/"/>
        </Switch>
      </Suspense>
  </>
  );
}

export default App;
