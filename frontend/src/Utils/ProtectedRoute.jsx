// // import React from 'react'
// // import { useSelector } from 'react-redux';
// // import { Navigate, Route } from 'react-router-dom'

// // const ProtectedRoute = ({ element: Element, ...rest }) => {
// //     const { loading, user, isAuthenticate } = useSelector(state => state.user);

// //     return (
// //         <>
// //             {
// //                 !loading && (
// //                     <Route
// //                         {...rest}
// //                         element={
// //                             isAuthenticate ? <Element /> : <Navigate to='/login' />
// //                         }
// //                     />
// //                 )
// //             }
// //         </>
// //     )
// // }

// // export default ProtectedRoute

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//     const { loading, isAuthenticate } = useSelector(state => state.user);
//     // Create the protect route if the user is not authenticate user can't get profile page ornot acces 
//     // outelet as elemt or componet with props it new tectnique to do or go to loginpage automatically
//     // and also get rid from {!isAuthenticate && <Component/>}

//     //Create a protected route so that if the user is not authenticated, they cannot access the profile page or any other protected components. Use the Outlet component to render the nested routes. If the user is not authenticated, they should be automatically redirected to the login page. This technique replaces the need for conditionally rendering components based on authentication status, such as {!isAuthenticate && <Component />}.


//     if (loading) {
//         return <div>Loading...</div>; // Or any other loading indicator you prefer
//     }

//     return isAuthenticate  ? <Outlet /> : <Navigate to='/login' />;
// };

// export default ProtectedRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../Components/Loader/Loder'

const ProtectedRoute = () => {
    const { loading, isAuthenticate, user } = useSelector((state) => state.user);

    if (loading) {
        return <Loader/>; // Or any other loading indicator you prefer
    }

    if (isAuthenticate === false) {
        return <Navigate to="/login" />;
    }

    // if (isAdmin && user.role !== 'admin') {
    //     return <Navigate to="/login" />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;
