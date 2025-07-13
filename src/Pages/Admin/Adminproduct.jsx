import React from 'react'

const Adminproduct = () => {
  const products = [
  { id: 1, name: "Handmade Vase", price: "$25", stock: 10, category: "Ceramics" },
  { id: 2, name: "Wool Shawl", price: "$40", stock: 5, category: "Textiles" },
  { id: 3, name: "Wooden Box", price: "$15", stock: 12, category: "Artifacts" },
];
  return (
    <div className=' h-[500px] mt-20 '>
      
    <table className="w-full border-collapse ">
      <thead className=''>
        <tr className="border-b   border-gray-400 ">
          <th className="text-left py-2 px-4">Product Name</th>
          <th className="text-left py-2 px-4">Price</th>
          <th className="text-left py-2 px-4">Stock</th>
          <th className="text-left py-2 px-4">Category</th>
          <th className="text-left py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ id, name, price, stock, category }) => (
          <tr key={id}>
            <td className="py-2 px-4">{name}</td>
            <td className="py-2 px-4">{price}</td>
            <td className="py-2 px-4">{stock}</td>
            <td className="py-2 px-4">{category}</td>
            <td className="py-2 px-4">
              <button className="text-blue-600 hover:underline">Edit</button>{" "}
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Adminproduct