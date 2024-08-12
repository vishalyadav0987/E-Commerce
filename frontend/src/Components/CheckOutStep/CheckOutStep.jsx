import React from 'react'
import { Typography, Stepper, StepLabel, Step } from '@mui/material';
import LocalShipping from '@mui/icons-material/LocalShipping';
import LibraryAddCheck from '@mui/icons-material/LibraryAddCheck';
import AccountBalance from '@mui/icons-material/AccountBalance';
import './CheckOutStep.css'

const CheckOutStep = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography style={{fontSize:"14px"}}>Shipping Details</Typography>,
            icon: <LocalShipping style={{fontSize:"24px"}}/>
        },
        {
            label: <Typography style={{fontSize:"14px"}}>Confirm Order</Typography>,
            icon: <LibraryAddCheck style={{fontSize:"24px"}}/>
        },
        {
            label: <Typography style={{fontSize:"14px"}}>Payment</Typography>,
            icon: <AccountBalance  style={{fontSize:"24px"}}/>
        },
    ]
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} 
            style={{ boxSizing: "border-box",fontSize:"24px" ,marginTop:"32px"}} >
                {
                    steps.map((item, index) => (
                        <Step key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel icon={item.icon}
                                style={{
                                    color: activeStep >= index ? "tomato" : "black"
                                }}
                            >{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </>
    )
}

export default CheckOutStep
