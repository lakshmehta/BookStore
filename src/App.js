import './App.css';
import SignUp from './components/SignUpBody/signUpBody';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/Protected/protected';
import AuthRoute from './components/Protected/auth';
import MyCartBag from './components/Cart/myCartBag';
import OrderSucess from './components/Order/orderSucces';
import Wishlist from './components/Wishlist/wishList'
function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={SignUp}/>
        <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
        <Route path="/cart" component={MyCartBag}/>
        <Route path="/wishlist" component={Wishlist}/>
        <Route path="/OrderSucess" component={OrderSucess}/>
      </Switch>
    </Router>
  );
}

export default App;
