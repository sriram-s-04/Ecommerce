import { onValue, ref, remove } from "firebase/database";
import React, { use, useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductAsync, fetchProducts } from "../Redux/slices/E_comSlice";




const Home = () => {

  const  state = useSelector((state) => state.products);
  console.log("State:", state);
  const dispatch = useDispatch();
  const nav = useNavigate();


  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  
  return (
    <div>
          <h1>Product List</h1>
         <table>
         <thead>
           <tr>
             <th>Title</th>
             <th>Price</th>
             <th>Category</th>
             <th>Image</th>
           </tr>
         </thead>
         <tbody>
           {state.data && state.data.map((product) => (
             <tr key={product.id}>
               <td>{product.title}</td>
               <td>{product.price}</td>
               <td>{product.category}</td>
               <td>
                 {product.image && (
                   <img src={product.image} alt={product.title} />
                 )}
               </td>
               <td>
                 <button
                   className="button"
                   onClick={() => {dispatch(deleteProductAsync(product.id)).then(() => {
                    dispatch(fetchProducts());
                   }); }}
                 >
                   Delete
                 </button>
               </td>
               <td>
                 <button
                   className="button"
                   onClick={() => nav(`/data_entry`, { state: product })}
                 >
                   Edit
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>

    </div>
  );
};

export default Home;
