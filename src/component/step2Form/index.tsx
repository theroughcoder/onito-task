import React, { useEffect, useState } from 'react'
import './style.css'
import { Autocomplete, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { isValidPhoneNumber } from 'libphonenumber-js';
import BootstrapButton from '../formButton';
import { log } from 'console';
interface stepForm {
    activeStep: number,
    steps: string[],
    handleBack: () => void;
    createUser: () => void;
    handleUser: (a: string, b: object) => void;
}

const Step2Form: React.FC<stepForm> = ({ activeStep, steps, handleBack, handleUser, createUser }) => {
    const [options, setOptions] = useState([])
    interface IFormInput {
        firstName: string
        gender: string
    }

    const schema = yup
        .object({
            address: yup.string(),
            state: yup.string(),
            city: yup.string(),
            country: yup.string(),
            pincode: yup.string().test("is-pcode", "Pincode should be a number", function (code, ctx) {
                // const { govtIssueID } = this.parent;
                return (code == "" || Number(code)) ? true : false;
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
    const [value1, setValue1] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    useEffect(() => {
        async function fetchCountry() {

            const response = await fetch(`https://restcountries.com/v3.1/name/${inputValue}`);
            const cty = await response.json();
            setOptions(cty.length ? cty.map((e: any) => e.name.common) : [])
        }
        fetchCountry();
    }, [inputValue])
    return (
        <form className='form' onSubmit={handleSubmit((data) => {
            // console.log(data)
            handleUser("step2Form", data);
            createUser();
            console.log(data)

        })}>
            <div className='form-head'>Address Details</div>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item sm={12} md={4}>
                    <TextField fullWidth id="outlined-basic "
                        label="Address"
                        aria-invalid={errors.address ? "true" : "false"}
                        variant="outlined"
                        {...register("address")}
                        error={errors.address && true}
                        helperText={errors.address ? errors.address.message : ""}
                    />
                </Grid>
                <Grid item sm={12} md={4}>
                    <TextField fullWidth id="outlined-basic "

                        label="State"
                        variant="outlined"
                        // type="number"
                        {...register("state")}
                        error={errors.state && true}
                        helperText={errors.state ? errors.state.message : ""}
                    />
                </Grid>
                <Grid item sm={12} md={4}>
                    <TextField fullWidth id="outlined-basic "

                        label="City"
                        variant="outlined"
                        // type="number"
                        {...register("city")}
                        error={errors.city && true}
                        helperText={errors.city ? errors.city.message : ""}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField fullWidth id="outlined-basic "

                        label="Pincode"
                        variant="outlined"
                        // type="number"
                        {...register("pincode")}
                        error={errors.pincode && true}
                        helperText={errors.pincode ? errors.pincode.message : ""}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    
                    <Autocomplete
                        // fullWidth
                        // sx={{width: "100%"}}
                        value={value1 || null}
                        onChange={(event: any, newValue: string | null) => {
                            setValue1(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        renderInput={(params) => <TextField {...register("country")}
                        {...params} label="Country" />}
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

export default Step2Form;

