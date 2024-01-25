import * as React from 'react';
import { useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { action } from '../../redux/reducers/usersReducer';
import Step1Form from '../../component/step1Form';
import '@fontsource/roboto';
import Step2Form from '../../component/step2Form';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import {  useSnackbar } from 'notistack';
import { MyDataTable } from '../../component/dataTable';
import { usersSelector } from '../../redux/reducers/usersReducer';
import { useSelector } from 'react-redux';

interface DataTableItem {
    name: string;
    age: number;
    city: string;
}
interface userInfoFrame {
    step1Form:{
        name: string
        age: string
        sex: string
        phone: string,
        govtIssueID: string,
        govtID: string,
    },
    step2Form:{
        address:string,
        pincode:string,
        city:string,
        state:string,
        country:string,
    }
}
const userInfoFrame={
    step1Form:{
        name: "",
        age: "",
        sex: "",
        phone: "",
        govtIssueID: "",
        govtID: "",
    },
    step2Form:{
        address:"",
        pincode:"",
        city:"",
        state:"",
        country:"",
    }
}
const Dashboard = () => {
    const data =  useSelector(usersSelector);
    const [userInfo, setUserInfo] = React.useState<userInfoFrame>(userInfoFrame);
    const tableRef = React.useRef<HTMLTableElement | null>(null);
    
    
    const { enqueueSnackbar } = useSnackbar();
    
    const steps = [
        'Personal Details',
        'Address Details'
    ];
    
    const dispatch = useDispatch();
    
        const [activeStep, setActiveStep] = React.useState(0);
        const [skipped, setSkipped] = React.useState(new Set<number>());
        
        const isStepOptional = (step: number) => {
            return step === 1;
        };
        
        const isStepSkipped = (step: number) => {
            return skipped.has(step);
        };
        
        const handleNext = () => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
            
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };
    
    useEffect(()=> {
        
        if(activeStep ==  steps.length) enqueueSnackbar('User added successfully', { variant: "success" });
        
    }, [activeStep])

    function handleUser(form: string, data: object){
        setUserInfo((pre)=> ({...pre, [form] : data}))
    }
    
    
    function createUser(){
        setUserInfo((pre)=>{
            console.log("user", pre)
            return userInfoFrame;
        });
        dispatch(action.addUser({...userInfo.step1Form, ...userInfo.step2Form , id: userInfo.step1Form.govtIssueID+" "+userInfo.step1Form.govtID }))
        handleNext();
        setTimeout(()=> handleReset() , 1000)
    }
    
    return (
        <div style={{ padding: '30px 20px' }}>
            <div style={{ fontSize: '25px' }}>Dashboard</div>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step  key={label}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, height: '200px',border:"2px solid #91f553", background: "#e4fad7", color:"white", borderRadius:'10px' }}>
                           
                        <Typography sx={{ mt: 2, mb: 1,color:"#91f553", fontSize: "25px", textAlign:"center", width:"100%", lineHeight: '150px' }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                        {activeStep == 0 ?
                            <Step1Form
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                // userInfo={userInfo}
                                handleUser={handleUser}
                            /> :
                            <Step2Form
                                activeStep={activeStep}
                                steps={steps}
                                handleBack={handleBack} 
                                handleUser={handleUser}
                                createUser={createUser}
                                 />
                            }

                    </React.Fragment>
                )}
            </Box>
            
            <MyDataTable data={data} columns={columns}/>

        </div>
    )
}

export default Dashboard;

const columns = [
	{
		name: 'Name',
		selector: (row : any) => row.name,
	},
	{
		name: 'Age',
		selector: (row: any) => row.age,
        sortable: true,

	},
	{
		name: 'Sex',
		selector: (row: any) => row.sex,

	},
	{
		name: 'Phone No',
		selector: (row: any) => row.phone,

	},
	{
		name: 'Govt Issue ID',
		selector: (row: any) => row.id,

	},
];
