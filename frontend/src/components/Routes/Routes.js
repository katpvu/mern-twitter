import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


// AuthRoute component keeps a user from visiting the login/signup page if they are logged in
// if no one is logged in, return a Route to the component, otherwise, return a route to the tweets index
export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/tweets" />
      )
    )} />
  );
};

// Protected route component: ensure that users can only access certain routes/info if they are logged in
// if user is logged in, return a route to the component, else a route to the log in page

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};