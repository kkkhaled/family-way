import React,{useState,useContext} from 'react';
import {Card,Grid,Typography} from '@material-ui/core';
import {couponsContext} from '../contexts/coupons/couponState'

const CouponsView = () => {
    const {coupons,getCoupons} = useContext(couponsContext);
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default CouponsView
