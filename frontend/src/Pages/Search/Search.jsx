import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom';



const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
            
        }
        else {
            navigate(`/products`);
        }
    }
    return (
        <>
            <form className="searchBox" onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='Search a product....'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search
