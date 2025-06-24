import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./DataEntery.css"; // Assuming you have a CSS file for styling
import { db } from "./firebaseConfig";
import { push, ref, set, update } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync, editProductAsync } from "../Redux/slices/E_comSlice"; // Import useSelector and useDispatch from react-redux
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const DataEntry = () => {
  const location = useLocation();
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
  useEffect(() => {
    let data = location.state || {};
    setFormData({
      ...data,
    });
  }, [location.state]);

  const nav = useNavigate();
  const formsubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // Check if in edit mode
    if (formData.isEditMode) {
      dispatch(editProductAsync(formData)).then(() => {
        alert("Product updated successfully!");
        nav("/"); // Navigate to home after editing
      });
    } else {
      // console.log("Form submitted:", formData);

      dispatch(addProductAsync(formData))
        .then(() => {
          alert("Product added successfully!");
          setFormData({ title: "", price: "", category: "", image: null }); // reset
        })
        .then(() => {
          nav("/");
          // Navigate to home after adding product
        });
    }
  };

  //for edit functionality
  return (
    <div className="main">
      <h1>Data Entry</h1>
      <Form onSubmit={formsubmit}>
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
            {/* <Form.Control
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
            /> */}
            <FileUploaderRegular
              type="file"
              sourceList="local, camera, facebook, gdrive"
              classNameUploader="uc-light "
              pubkey="138859bc58b69e12e57c"
              onChange={(e) => {
                // console.log("File uploaded:", e);
                // setFormData({ ...formData, image: e.cdnUrl });
                const uploadedFile = e?.successEntries?.[0]?.cdnUrl;
                if (uploadedFile) {
                  // console.log("Extracted URL:", uploadedFile);
                  setFormData({ ...formData, image: uploadedFile });
                }
              }}
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
