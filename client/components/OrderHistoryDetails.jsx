import React from 'react';

const OrderHistoryDetails = () => {
  return (
    <div>ORDER DETAILS</div>
    // <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/cart.jpg')]">
    //   <div className="flex flex-col gap-10 w-full max-w-xl absolute top-30 left-10 pt-16">
    //     <p className="text-center text-4xl font-extrabold text-primary-deep-green">
    //       Previous Orders
    //     </p>

    //     <div className="relative overflow-x-auto">
    //       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    //         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //           <tr>
    //             <th scope="col" className="px-6 py-3">
    //               Order Id
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Date of Order
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Item Qty
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Total
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {userOrders && userOrders.length
    //             ? userOrders.map((order) => {
    //                 return (
    //                   <tr
    //                     onClick={() => orderDetails(order.id)}
    //                     key={order.id}
    //                     className="cursor-pointer hover:text-primary-promo-banner"
    //                   >
    //                     <th scope="col" className="px-6 py-3">
    //                       {order.id}
    //                     </th>
    //                     <th scope="col" className="px-6 py-3">
    //                       {order.createdAt.slice(0, 10)}
    //                     </th>
    //                     <th scope="col" className="px-6 py-3">
    //                       {order.totalQty}
    //                     </th>
    //                     <th scope="col" className="px-6 py-3">
    //                       {order.finalPrice}
    //                     </th>
    //                   </tr>
    //                 );
    //               })
    //             : 'No past orders!'}
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="pt-50 m-auto">
    //       <button
    //         className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner py-1"
    //         onClick={goBack}
    //       >
    //         Back
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderHistoryDetails;
