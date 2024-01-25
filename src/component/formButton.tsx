import styled from "@emotion/styled";
import { Button } from "@mui/material";

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '0px solid',
    lineHeight: 1.5,
    // background: 'linear-gradient( 180deg, rgb(239, 211, 50), rgb(244, 161, 45))',
    borderColor: '#0063cc',
    borderRadius: '6px',
    width: '120px',
    height: '45px',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#000',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
    },
    '&:focus': {
        //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});
export default BootstrapButton;