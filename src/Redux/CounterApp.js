import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './slices/CounterSlice'; // Adjust the import

function CounterApp() {
  const count = useSelector((state) => state.counter.value);
  console.log("CounterApp Rendered", count);
  const dispatch = useDispatch();
  

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount({input:5}))}>Increment by 5</button>
    </div>
  )
}

export default CounterApp;    