import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Polls from './Pages/Polls';
import NavBar from './Components/NavBar/NavBar';
import NotificationsList from './Containers/Notifications';
import Rewards from './Pages/Rewards';
import Score from './Pages/Score';
import ProfileContainer from './Containers/Profile';
import Checkout from './Pages/Checkout';
import Dotenv from 'dotenv';

Dotenv.config();

const App = () => {
  return (
    <div>
      <div className="right-half" />
      <header>
        <nav className="wrapper">
          <NavBar />
        </nav>
      </header>
      <main className="wrapper">
        <Switch>
          <Route path="/polls/:id" render={props => <Polls {...props} />} />
          <Route path="/polls" render={props => <Polls {...props} />} />
          <Route path="/notifications" component={NotificationsList} />
          <Route path="/rewards" component={Rewards} />
          <Route path="/score" component={Score} />
          <Route path="/profile" component={ProfileContainer} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={Polls} />
          <Route component={() => <p>This page does not exist!</p>} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
