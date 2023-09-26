import React from 'react';
import Header from '../../shared/Header/Header';
import {Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';
import UserHeader from '../../shared/Header/UserHeader';

const Main = () => {
    const user = useSelector((state) => state?.user?.user?.uid);
    return (
        <div>
            {/* <Header/> */}
            {
                user?<UserHeader/> : <Header/>
            }
            <div style={{paddingTop:"80px"}}>
            <Outlet/>
            </div>
        </div>
    );
};

export default Main;