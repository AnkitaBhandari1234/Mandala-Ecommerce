import React, { useState } from "react";
import api from "../../Api/axios";
import { toast } from "react-toastify";

const AddNewProduct = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    stock:"",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subcategory", formData.subcategory);
      data.append("stock",formData.stock);
      data.append("description", formData.description);
      data.append("image", imageFile); // Append the image file

      const response = await api.post("addproducts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

     toast.success("Product added successfully!");
    localStorage.setItem("productUpdate", Date.now()); // 🔁 signal
    onClose();
    } catch (error) {
       toast.error("Failed to add product");
    console.error("Product upload failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-md">
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="subcategory"
            placeholder="Sub Category"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border px-3 py-2 rounded"
            required
          />
          <textarea
  name="description"
  placeholder="Description"
  onChange={handleChange}
  className="border px-3 py-2 rounded"
  required
/>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
