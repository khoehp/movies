// import PageNotFound from "common/components/404";
import Header from "common/components/header";
import { fetchProfileAction } from "features/authentication/action";
import Signin from "features/authentication/pages/SignIn";
import Signup from "features/authentication/pages/SignUp";
import Booking from "features/booking/pages/booKing";
import Detail from "features/booking/pages/Detail";
import Home from "features/booking/pages/Home";
import Payment from "features/booking/pages/Payment";
import MovieManagement from "features/movies/pages/MovieManagement";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/booking" component={Booking} />
        <Route path="/payment" component={Payment} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies" component={MovieManagement} />
        {/* <Route path="*" component={PageNotFound} /> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
