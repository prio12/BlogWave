import React from 'react';
import Header from '../../shared/Header/Header';
import {Outlet} from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Header/>
            <div style={{paddingTop:"80px"}}>
            <Outlet/>
            </div>
        </div>
    );
};

export default Main;