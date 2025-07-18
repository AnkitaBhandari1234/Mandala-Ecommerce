import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { toast } from "react-toastify";

const SellerProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch seller-specific products
  const fetchSellerProducts = async () => {
    try {
      const res = await api.get("/seller/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load seller products");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/addproducts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      toast.success("Product deleted");
      fetchSellerProducts(); // Refresh
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Products</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2 px-4 font-semibold">Image</th>
            <th className="text-left py-2 px-4 font-semibold">Product Name</th>
            <th className="text-left py-2 px-4 font-semibold">Price</th>
            <th className="text-left py-2 px-4 font-semibold">Stock</th>
            <th className="text-left py-2 px-4 font-semibold">Category</th>
            <th className="text-left py-2 px-4 font-semibold">Subcategory</th>
            <th className="text-left py-2 px-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const inStock = product.stock > 0;

            return (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={
                        product.image[0].startsWith("http")
                          ? product.image[0]
                          : `http://localhost:8000/${product.image[0]}`
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">NRs. {product.price.toFixed(2)}</td>
                <td className={`py-3 px-4 font-semibold ${inStock ? "text-green-600" : "text-red-600"}`}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.subcategory}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SellerProduct;
