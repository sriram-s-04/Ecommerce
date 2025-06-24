import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, push, ref, remove, set, update } from "firebase/database";
import { db } from "../../Components/firebaseConfig"; // Assuming this is a utility to create object URLs

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
export const addProductAsync = createAsyncThunk(
  "products/addProductAsync",
  async (product) => {
    // console.log("Adding product:", product  );
    const newProductRef = push(ref(db, "products"));
    await set(newProductRef, {
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image || null,
    });
    return {
      id: newProductRef.key,
      ...product,
     };
  }
);

//edit product
export const editProductAsync = createAsyncThunk(
  "products/editProductAsync",
  async (product) => {
    // console.log("Editing product:", product);

    const productRef = ref(db, `products/${product.id}`);
    await update(productRef, {
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image || null,
    });
    return { id: product.id, ...product };
  }
);
//delete product
export const deleteProductAsync = createAsyncThunk(
  "products/deleteProductAsync",
  async (productId) => {
    await remove(ref(db, `products/${productId}`));
    return productId;
  }
);


const e_com = createSlice({
  name: "products",
  initialState: { 
    loading: false,
    data: [], // Initialize data as an empty array
    iserror: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
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
  reducers: {},
});



export default e_com.reducer;
