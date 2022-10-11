import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [qt, setQt] = useState(0);
  const [price, setPrice] = useState(0);
  const [ed_name, setedName] = useState(name);
  const [ed_qt, setedQt] = useState(qt);
  const [ed_price, setedPrice] = useState(price);
  const [tprice, setTprice] = useState(0);
  const [edtprice, setedTprice] = useState(tprice);
 
  const [stock, setStock] = useState([]);
  const[show,setShow]=useState(false)

  useEffect(() => {
    Axios.get("http://localhost:5001/api/get").then((res) => {
      setStock(res.data);
    });
  }, [stock]);

  const submitData = () => {
    Axios.post("http://localhost:5001/api/insert", {
      item_name: name,
      qt: qt,
      item_price: price,
      total_price: qt * price,
      status: qt > 100 ? "high" : "low",
    }).then(() => {
      alert("ADDED TO DB ✅");
    });
  };

  const delData = (name) => {
    Axios.delete(`http://localhost:5001/api/del/${name}`).then(() => {
      alert("Deleted From DB ✅");
    });
  };

  const editData = (name) => {
    Axios.put(`http://localhost:5001/api/edit/${name}`,{
      item_name: ed_name,
      qt: ed_qt,
      item_price: ed_price,
      total_price: ed_qt * ed_price,
      status: ed_qt > 100 ? "high" : "low",
    })
    setShow(!show)
  };

  return (
    <div className="App bg-green-50 text-center">
      <h1 className="text-4xl text-green-600 font-extrabold pt-10">
        SUPERMARKET DATABASE 🏪
      </h1>
      <div className="flex items-center justify-items-center m-9 rounded-xl shadow overflow-hidden border-b border-gray-200 sm:rounded-lg border-1 bg-green-100 p-10">
        <div className="mx-2">
          <label>Item Name</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          ></input>
        </div>
        <div className="mx-2">
          <label>Quantity</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={qt}
            onChange={(e) => setQt(e.target.value)}
            name="qt"
          ></input>
        </div>
        <div className="mx-2">
          <label>Item Price</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
          ></input>
        </div>
        <div className="mx-2">
          <label>Total Price</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={price * qt}
            onChange={(e) => setTprice(e.target.value)}
            name="tprice"
          ></input>
        </div>
        <div className="mx-2">
          <button
            onClick={submitData}
            type="button"
            className="p-3 text-white shadow-lg rounded-lg bg-green-500"
          >
            Add
          </button>
        </div>
      </div>
      <div className="my-10 mx-5 p-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
              
         
                    </tr>
                    <div className={`${show?'flex items-center justify-items-center align-middle':'hidden'} m-5 rounded-xl shadow overflow-hidden border-b border-gray-200 sm:rounded-lg border-1 bg-blue-100 p-5`}>
        <div className="mx-2">
          <label>Item Name</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={ed_name}
            onChange={(e) => setedName(e.target.value)}
            name="name"
          ></input>
        </div>
        <div className="mx-2">
          <label>Quantity</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={ed_qt}
            onChange={(e) => setedQt(e.target.value)}
            name="qt"
          ></input>
        </div>
        <div className="mx-2">
          <label>Item Price</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={ed_price}
            onChange={(e) => setedPrice(e.target.value)}
            name="price"
          ></input>
        </div>
        <div className="mx-2">
          <label>Total Price</label>
          <input
            className="p-1 rounded-md mx-1"
            type="text"
            value={ed_price * ed_qt}
            onChange={(e) => setedTprice(e.target.value)}
            name="tprice"
          ></input>
        </div>
        
      </div>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stock.map((item) => {
                      return (
                        <tr key={item.item_name}>
                          <td className=" py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.item_name}
                            </div>
                          </td>
                          <td className=" py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.qt}
                            </div>
                          </td>
                          <td className=" py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.item_price}
                            </div>
                          </td>
                          <td className=" py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.item_price * item.qt}
                            </div>
                          </td>
                          <td className=" py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                                item.qt > 100 ? "bg-green-100" : "bg-red-200"
                              }`}
                            >
                              {" "}
                              {item.qt > 100 ? "High" : "Low"}{" "}
                            </span>
                          </td>
                          <td>
                      <div className="flex">
                      <button
            onClick={()=>editData(item.item_name)}
            type="button"
            className={`p-2 text-white shadow-lg rounded-lg bg-green-500 ${show?'block':'hidden'}`}
          >
            Done
          </button>
                      
          <div className="mx-2">
          <button
            onClick={()=>setShow(!show)}
            type="button"
            className="p-2 text-white shadow-lg rounded-lg bg-blue-500"
          >
            Edit
          </button>
        </div>
                          <button
            onClick={()=>{delData(item.item_name)}}
            type="button"
            className="p-2 mr-1 text-white shadow-lg rounded-lg bg-red-500"
          >
            Delete
          </button>
                      </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
