"use client";

import { useContext, useState, useEffect } from 'react';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [routineName, setRoutineName] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Run only on client
    if (typeof window === 'undefined') return;

    const t = localStorage.getItem('token');
    setToken(t);

    const fetchWorkoutsAndRoutines = async () => {
      try {
        if (!t) return; // no token, skip authenticated fetch

        const [workoutsResponse, routinesResponse] = await Promise.all([
          axios.get('http://localhost:8000/workouts/workouts', {
            headers: { Authorization: `Bearer ${t}` },
          }),
          axios.get('http://localhost:8000/routines', {
            headers: { Authorization: `Bearer ${t}` },
          }),
        ]);

        setWorkouts(workoutsResponse.data);
        setRoutines(routinesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response && error.response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          try {
            logout();
          } catch (e) {
            // ignore
          }
        }
      }
    };

    fetchWorkoutsAndRoutines();
  }, []);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/workouts', {
        name: workoutName,
        description: workoutDescription,
      });
      setWorkouts([...workouts, response.data]);
      setWorkoutName('');
      setWorkoutDescription('');
    } catch (error) {
      console.error('Failed to create workout:', error);
    }
  };

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/routines', {
        name: routineName,
        description: routineDescription,
        workouts: selectedWorkouts,
      });
      setRoutineName('');
      setRoutineDescription('');
      setSelectedWorkouts([]);
    } catch (error) {
      console.error('Failed to create routine:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <div className="grid">
          <div className="panel">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
              <h1 style={{fontSize:22}}>Welcome</h1>
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 style={{marginBottom:8}}>Create Workout</h3>
                <form onSubmit={handleCreateWorkout}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="workoutName">Workout Name</label>
                    <input id="workoutName" className="form-control" value={workoutName} onChange={(e)=>setWorkoutName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="workoutDescription">Workout Description</label>
                    <input id="workoutDescription" className="form-control" value={workoutDescription} onChange={(e)=>setWorkoutDescription(e.target.value)} required />
                  </div>
                  <button className="btn btn-primary" type="submit">Create Workout</button>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 style={{marginBottom:8}}>Create Routine</h3>
                <form onSubmit={handleCreateRoutine}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="routineName">Routine Name</label>
                    <input id="routineName" className="form-control" value={routineName} onChange={(e)=>setRoutineName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="routineDescription">Routine Description</label>
                    <input id="routineDescription" className="form-control" value={routineDescription} onChange={(e)=>setRoutineDescription(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Select Workouts</label>
                    <select multiple className="form-control" value={selectedWorkouts} onChange={(e) => setSelectedWorkouts([...e.target.selectedOptions].map(option => option.value))}>
                      {workouts.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                  <button className="btn btn-primary" type="submit">Create Routine</button>
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className="panel">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <h3>Your routines</h3>
              </div>
              {routines.length === 0 && <p className="muted">No routines found yet.</p>}
              {routines.map(routine => (
                <div className="card" key={routine.id}>
                  <div className="card-body">
                    <h5 className="card-title">{routine.name}</h5>
                    <p className="muted">{routine.description}</p>
                    <ul style={{marginTop:8}}>
                      {routine.workouts && routine.workouts.map(w => (
                        <li key={w.id}>{w.name}: {w.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;