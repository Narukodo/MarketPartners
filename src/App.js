import React, { StrictMode } from 'react'
import { TableForm, InfoForm } from './pages'
import { ErrorBoundary } from 'components/container'
import DevTools from 'mobx-react-devtools';
import { mpStore, jwtStore } from 'stores'
import { Provider } from 'mobx-react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const isDev = process.env.NODE_ENV === 'development'
const stores = { mpStore, jwtStore }

// referral ID (auto-generated) --> optional
// submit button text: if (referral ID provided) text = "update", else text = "submit"
const App = () => (
  <StrictMode>
    <ErrorBoundary>
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route exact path="/" component={TableForm}/>
            <Route path="/save" component={() => <Redirect to='/' />}/>
            <Route path="/update/:id" component={InfoForm}/>
            <Route path="/new" component={InfoForm}/>
          </Switch>
        </Router>
      </Provider>
      {!isDev || <DevTools/>}
      </ErrorBoundary>
    </StrictMode>
)


export default App
