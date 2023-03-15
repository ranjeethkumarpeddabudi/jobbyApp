import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Home from './Home'
import NotFound from './NotFound'
import JobDetails from './JobDetails'
import Jobs from './Jobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
