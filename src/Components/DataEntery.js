import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./DataEntery.css"; // Assuming you have a CSS file for styling
import { db } from "./firebaseConfig";
import { push, ref, set, update } from "firebase/database";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addProduct} from "../Redux/slices/E_comSlice"; // Import useSelector and useDispatch from react-redux
const DataEntry = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "T-shirt" },
    { id: 2, name: "Jeans" },
    { id: 3, name: "Jacket" },
    { id: 4, name: "Shoes" },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });
  // const [isEditMode, setIsEditMode] = useState(false);
  const state = useSelector((state) => state.products);
  console.log("State:", state);
  
  const dispatch = useDispatch();
  // const onSubmit = (e) => {
  //     e.preventDefault();

  //     console.log('Form submitted:', formData);
  //     const newRef = push(ref(db, 'products'));
  //     set(newRef, {
  //         title: formData.title,
  //         price: formData.price,
  //         category: formData.category,
  //         image: formData.image ? URL.createObjectURL(formData.image) : null // Convert file to URL for display
  //     });

  //     // const formDataToSubmit =  new FormData();
  //     // formDataToSubmit.append('title', formData.title);
  //     // formDataToSubmit.append('price', formData.price);
  //     // formDataToSubmit.append('category', formData.category);
  //     // if (formData.image) {
  //     //     formDataToSubmit.append('image', formData.image);
  //     // }
  //     // console.log('Form submitted:', formDataToSubmit);
  //     alert('Form submitted successfully!');
  //     setFormData({
  //         title: '',
  //         price: '',
  //         category: '',
  //         image: null
  //     });

  // };
  const formsubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    // // Check if in edit mode
    // if (formData.isEditMode) {
    //     const productRef = ref(db, `products/${formData.id}`);
    //     update(productRef,{
    //         title: formData.title,
    //         price: formData.price,
    //         category: formData.category,
    //         image: formData.image ? URL.createObjectURL(formData.image) : null // Convert file to URL for display
    //     })
    //     .then(() => {
    //         alert('Product updated successfully!');
    //     })
    // } else {
    // console.log('Form submitted:', formData);
    
    dispatch(addProduct(formData));
    // }
  };

  const location = useLocation();
  // console.log('Location:', location);

  useEffect(() => {
    let data = location.state || {};
    setFormData({
      ...data,
      isEditMode: true,
    });
  }, []);

  //for edit functionality
  return (
    <div className="main">
      <h1>Data Entry</h1>
      <Form
        onSubmit={formsubmit}
      >
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Enter price"
              type="number"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              id="categorySelect"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            {/* Remove value prop from file input */}
            <Form.Control
              type="file"
              
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </Form.Group>
          <Button className="btn" type="submit">
            Submit
          </Button>
        </fieldset>
      </Form>
    </div>
  );
};

export default DataEntry;
