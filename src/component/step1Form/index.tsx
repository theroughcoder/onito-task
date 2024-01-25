import React from 'react'
import './style.css'
import {  FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
// import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { isValidPhoneNumber } from 'libphonenumber-js';
import BootstrapButton from '../formButton';

interface stepForm {
    activeStep: number,
    steps: string[],
    handleBack: () => void,
    handleNext: () => void,
    handleUser: (a: string, b: object)=> void,
    // userInfo: object,
}

const Step1Form: React.FC<stepForm> = ({ activeStep, steps, handleBack, handleNext, handleUser }) => {
    interface IFormInput {
        firstName: string
        gender: string
    }

    const schema = yup
        .object({
            name: yup.string().required("Name is required").min(3),
            age: yup.string().required("Age is required").test("is-age", "error", function (code, ctx) {
                // const { govtIssueID } = this.parent;
                // console.log("hello" , govtIssueID, a);

                if ((!Number(code))) {
                    return ctx.createError({ message: 'Age no should be a number' })
                }
                if ((Number(code) < 0 || !(Number(code) % 1 == 0))) {
                    return ctx.createError({ message: 'Age should be a positive integer' })
                }

                return true;
            }),
            sex: yup.string().required().oneOf(['Male', "Female"], "Select One option"),
            phone: yup.string().required().test({
                name: 'is-phone',
                skipAbsent: true,
                test(value, ctx) {
                    if (!value.startsWith('+91')) {
                        return ctx.createError({ message: 'Phone no should be Indian' })
                    }
                    if (!(value.split(" ", 3)[1])) {
                        return ctx.createError({ message: 'Phone no is required' })
                    }
                    if (!isValidPhoneNumber(value)
                    ) {
                        return ctx.createError({ message: 'Phone no should be of 10 digits' })
                    }

                    return true
                }
            }),
            govtIssueID: yup.string().required("Govt issue id required").oneOf(["Pan", "Aadhar"], "Select one option"),
            govtID: yup.string().required("Govt ID is required").test("is-right-zipcode", "error", function (code, ctx) {
                // const { govtIssueID } = this.parent;
                // console.log("hello" , govtIssueID, a);
                if (ctx.parent.govtIssueID == "") {
                    return ctx.createError({ message: 'First select Govt Issue ID' })
                }
                if (ctx.parent.govtIssueID == "Aadhar" && (!Number(code))) {
                    return ctx.createError({ message: 'Aadhar no should be a number' })
                }
                if (ctx.parent.govtIssueID == "Aadhar" && !(code.length == 12)) {
                    return ctx.createError({ message: 'Aadhar no should of 12 digits' })
                }
                if (ctx.parent.govtIssueID == "Aadhar" && (code.startsWith('0') || code.startsWith('1'))) {
                    return ctx.createError({ message: 'Aadhar no should not start with 1 or 0' })
                }

                return true;
            })
        })

    const [value, setValue] = React.useState('+91');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const handleChange = (newValue: string) => {
        setValue(newValue)
        matchIsValidTel(newValue)
    }

    return (
        <form className='form' onSubmit={handleSubmit((data) => {
            handleNext()
            handleUser("step1Form", data);
        })}>
            <div className='form-head'>Personal Details</div>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item sm={6} md={4}>
                    <TextField fullWidth id="outlined-basic "
                        label="Name"
                        aria-invalid={errors.name ? "true" : "false"}
                        variant="outlined"
                        {...register("name")}
                        error={errors.name && true}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </Grid>
                <Grid item sm={6} md={4}>
                    <TextField fullWidth id="outlined-basic "

                        label="Age"
                        variant="outlined"
                        // type="number"
                        {...register("age")}
                        error={errors.age && true}
                        helperText={errors.age ? errors.age.message : ""}
                    />


                </Grid>
                <Grid item sm={6} md={4}>
                    <FormControl fullWidth >
                        <InputLabel 
                            id="demo-simple-select-label" color={errors.sex && "error"}>Sex</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Sex"
                            {...register("sex")}
                            error={errors.sex && true}

                        // onChange={handleChange}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                        <FormHelperText style={{ color: "#db4125" }} >{errors.sex ? errors.sex.message : ""}</FormHelperText>
                    </FormControl >
                </Grid>
                <Grid item sm={6} md={4}>

                    <MuiTelInput
                        fullWidth
                        {...register("phone")}

                        value={value}
                        onChange={handleChange}
                        error={errors.phone && true}
                        helperText={errors.phone ? errors.phone.message : ""}
                    />
                </Grid>

                <Grid item sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" color={errors.govtIssueID && "error"}>Govt Issued ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Govt Issued ID"
                            {...register("govtIssueID")}
                            error={errors.govtIssueID && true}
                        >
                            <MenuItem value={"Pan"}>Pan</MenuItem>
                            <MenuItem value={"Aadhar"}>Aadhar</MenuItem>

                        </Select>
                        <FormHelperText style={{ color: "#db4125" }}>{errors.govtIssueID ? errors.govtIssueID.message : ""}</FormHelperText>

                    </FormControl>
                </Grid>
                <Grid item sm={6} md={4}>
                    <TextField
                        fullWidth
                        id="outlined-number"
                        label="Govt ID"
                        {...register("govtID")}
                        error={errors.govtID && true}
                        helperText={errors.govtID ? errors.govtID.message : ""}
                    />
                </Grid>

            </Grid>
            <div className='form-bottom'>
                <BootstrapButton sx={{ background: 'black' }}
                    type='submit' variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                > BACK </BootstrapButton>

                <BootstrapButton
                    type='submit'
                    variant="contained"
                    sx={{ background: 'linear-gradient( 180deg, rgb(239, 211, 50), rgb(244, 161, 45))' }}

                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </BootstrapButton>

            </div>

        </form>
    )
}

export default Step1Form;

