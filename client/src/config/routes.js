import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import Callback from './callback';
import history from '../history';
import Login from '../containers/login'
import Iterator from '../containers/iterator'


export const MainRoutes = () => {
  return (
      <Router history={history}>
        <div>
            <Route path="/" render={(props) => 
                <Login {...props} />
            }/>
            <Route path="/iterator" render={(props) => 
                <Iterator {...props} />
            }/>
            <Route path="/callback" render={(props) => {
                return <Callback {...props} /> 
            }}/>
        </div>
      </Router>
  );
}


        // <Route path="/profile" render={(props) => (
        //     !auth.isAuthenticated() ? (
        //         <Redirect to = "/center" />
        //       ) : (
        //         <Profile auth={auth} {...props} />
        //       )
        //     )} />