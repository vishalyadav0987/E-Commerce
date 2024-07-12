import React from 'react'
import './SearchReview.css'
import { IoClose } from "react-icons/io5";

const SearchReview = ({ productId, setProductId,getReviewSubmitHandler,clickHandler }) => {
    return (
        <div className='search-review' style={{
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
        }}>
            
            <div className="card-search"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    background: "white",
                    border: "1px solid #d2d2d2d2",
                    width: "320px",
                    padding: "35px 20px",
                    borderRadius: "4px",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    marginLeft: "-196px",
                    position:"relative"
                }}
            >
                <div className="close-cross" onClick={clickHandler}><IoClose /></div>
                <input type="search"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    style={{
                        padding: "10px",
                        outline: "none",
                        border: "1px solid #d2d2d2d2",
                        fontSize: "14px"
                    }}
                />
                <button
                onClick={getReviewSubmitHandler}
                    style={{
                        outline: "none",
                        padding: "10px 30px",
                        color: "white",
                        background: "#240750",
                        border: "1px solid #d2d2d2d2",
                        cursor: "pointer"
                    }}
                >Search</button>
            </div>
        </div>
    )
}

export default SearchReview
