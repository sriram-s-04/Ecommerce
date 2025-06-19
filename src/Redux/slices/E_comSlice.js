import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, onValue, push, ref, set } from "firebase/database";
import { db } from "../../Components/firebaseConfig";

export const fetchProducts = createAsyncThunk(
  "datas/fetchProducts",
  async () => {
    const productsRef = ref(db, "products");
    const snapshot = await get(productsRef);
    const data = snapshot.val();
    if (!data) return [];

    // Convert Firebase object to array of products with id
    return Object.entries(data).map(([id, product]) => ({
      id,
      ...product,
    }));
  }
);

const e_com = createSlice({ 
  name: "products",
  initialState: { 
    loading: false,
    data: null,
    iserror: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending,  (state) => {
      state.data = null; // Reset data to null while fetching
      state.loading = true; // Set loading to true while fetching 
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload || [];
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false; // Set loading to false if fetching fails
      state.iserror = true; // Set iserror to true if fetching fails
    });       

  },
  reducers: {
    // You can add additional synchronous reducers here if needed
    addProduct: (state, action) => {
      state.data.push(action.payload);
      // If you want to sync with Firebase here, use action.payload instead of formData
      const newRef = ref(db, 'products');
      const newProductRef = push(newRef);
      set(newProductRef, {
        title: action.payload.title,
        price: action.payload.price,
        category: action.payload.category,
        image: action.payload.image ? URL.createObjectURL(action.payload.image) : null // Convert file to URL for display
      })
      .then(() => {
        alert('Product added successfully!');
      });
    },
  },
});



export const { addProduct } = e_com.actions;
export default e_com.reducer;
