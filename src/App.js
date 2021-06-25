import './App.css';
import SignUp from './components/SignUpBody/signUpBody';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/Protected/protected';
import AuthRoute from './components/Protected/auth';
function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={SignUp}/>
        <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
