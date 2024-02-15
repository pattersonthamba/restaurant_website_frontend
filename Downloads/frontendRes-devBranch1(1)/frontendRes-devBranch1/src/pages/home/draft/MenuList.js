/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuList.js
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './menuList.css';

const MenuList = ({
  menus,
  handleViewDetails,
  handleAddToCart,
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  handleCloseModal,
  showModal,
  selectedMenuItem
}) => {
  // return (
  //   <div id="products" className="col-12">
  //     <div className="row">
  //       <div className="col-10 fixed-search">
  //         <input
  //           type="text"
  //           className={`form-control `}
  //           placeholder="Search products..."
  //           value={searchTerm}
  //           onChange={handleSearchChange}
  //         />
  //       </div>
  //     </div>

  //     <div style={{ margin: '2%' }} className="borderUp">
  //       <div>
  //         {menus.map((menuItem) => (
  //           <div key={menuItem._id} className="row" style={{ margin: '2%' }}>
  //             <div className="col">
  //               <article className="menu-item">
  //                 <div>
  //                   <img
  //                     src={
  //                       menuItem.images.length > 0
  //                         ? menuItem.images[0].image
  //                         : 'https://via.placeholder.com/75x50'
  //                     }
  //                     alt={menuItem.name}
  //                     className="photo img-fluid"
  //                   />
  //                 </div>

  //                 <div className="item-info">
  //                   <header>
  //                     <h4>{menuItem.name}</h4>
  //                     <h4>${menuItem.price}</h4>
  //                   </header>
  //                   <p className="item-desc">{menuItem.mealTypeCategory}</p>
  //                   <div style={{ margin: '5%' }}>{menuItem.description}</div>
  //                   <div>
  //                     <button
  //                       type="button"
  //                       id="cart_btn"
  //                       disabled={!menuItem.isAvailable}
  //                       onClick={() => handleAddToCart(menuItem)}
  //                       className="btn d-inline mb-2 ms-auto "
  //                       style={{
  //                         backgroundColor: '#ffa500',
  //                         color: 'white',
  //                         textTransform: 'none'
  //                       }}
  //                     >
  //                       {!menuItem.isAvailable ? (
  //                         <h6>Sold Out</h6>
  //                       ) : (
  //                         <h6>Add to Cart</h6>
  //                       )}
  //                     </button>
  //                   </div>
  //                 </div>
  //               </article>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div id="products" className="col-12">
      <div className="row">
        <div className="col-10 fixed-search">
          <input
            type="text"
            className={`form-control `}
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {menus.length === 0 ? (
        <div style={{ margin: '2%', textAlign: 'center' }}>
          <p>No menus found.</p>
        </div>
      ) : (
        <div style={{ margin: '2%' }} className="borderUp">
          <div>
            {menus.map((menuItem) => (
              <div key={menuItem._id} className="row" style={{ margin: '2%' }}>
                <div className="col">
                  <article className="menu-item">
                    <div>
                      <img
                        src={
                          menuItem.images.length > 0
                            ? menuItem.images[0].image
                            : 'https://via.placeholder.com/75x50'
                        }
                        alt={menuItem.name}
                        className="photo img-fluid"
                      />
                    </div>

                    <div className="item-info">
                      <header>
                        <h4>{menuItem.name}</h4>
                        <h4>${menuItem.price}</h4>
                      </header>
                      <p className="item-desc">{menuItem.mealTypeCategory}</p>
                      <div style={{ margin: '5%' }}>{menuItem.description}</div>
                      <div>
                        <button
                          type="button"
                          id="cart_btn"
                          disabled={!menuItem.isAvailable}
                          onClick={() => handleAddToCart(menuItem)}
                          className="btn d-inline mb-2 ms-auto "
                          style={{
                            backgroundColor: '#ffa500',
                            color: 'white',
                            textTransform: 'none'
                          }}
                        >
                          {!menuItem.isAvailable ? (
                            <h6>Sold Out</h6>
                          ) : (
                            <h6>Add to Cart</h6>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
