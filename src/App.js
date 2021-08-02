import React, { useState,useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = `https://course-api.com/react-tours-project`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {

    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      
    } catch (error) {
      setLoading(false);
      alert(error);
    }

  }

  useEffect(() => {
    fetchTours();
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>)
  }

  if(tours.length===0){
    return <main>
      <div className="title">
        <h2>No tour left</h2>
        <button onClick={fetchTours} className='btn'>Refresh</button>
      </div>
    </main>
  }

  const removeTour = (id) => {
    const tour =  tours.filter((tour)=>{
      return tour.id !== id
    })
    setTours(tour)
  }

  return (
    <>
      <Tours tours={tours} removeTour={removeTour}/>
    </>
  );
}

export default App;
