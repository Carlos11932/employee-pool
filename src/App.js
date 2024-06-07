import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import NewPoll from './components/NewPoll/NewPoll';
import Leaderboard from './components/Leaderboard/Leaderboard';
import PollDetails from './components/PollDetails/PollDetails';
import NotFound from './components/NotFound/NotFound';
import LoadingBar from "react-redux-loading-bar";
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute>
                <NewPoll />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/questions/:question_id" element={
              <ProtectedRoute>
                <PollDetails />
              </ProtectedRoute>
            } />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  loading: !authedUser && Object.keys(users).length === 0,
});

export default connect(mapStateToProps)(App);