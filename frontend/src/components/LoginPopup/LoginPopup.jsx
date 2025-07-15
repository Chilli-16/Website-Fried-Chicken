import React, { useContext, useState } from 'react';
import './Loginpopup.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/storeContext';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(storeContext);
    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isChecked, setIsChecked] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `${url}/api/user/${currentState === "Login" ? "login" : "register"}`;
        console.log(newUrl); // Kiểm tra URL
    
        try {
            const response = await axios.post(newUrl, data);
            // console.log(response.data); // Kiểm tra dữ liệu trả về
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId); // Lưu userId vào localStorage
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("API request error:", error);
            alert("There was an error connecting to the server.");
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isChecked) {
            alert("Please agree to the terms of use & privacy policy.");
            return;
        }
        onLogin(event);
    };


    return (
        <div className='login-popup'>
            <MDBContainer fluid className="p-3 my-5 container">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="close-icon"
                    onClick={() => setShowLogin(false)}
                    style={{ fontSize: '24px', color: '#000' }}
                />
                <form onSubmit={handleSubmit}> {/* Use a form element */}
                    <MDBRow>
                        <MDBCol col='10' md='6' className='imgeSignin'>
                            <img src={assets.signin} className="img-fluid" alt="imgLogin" />
                        </MDBCol>
                        <MDBCol col='4' md='6' className='formlogin'>
                            <MDBContainer className="p-3 my-5 d-flex flex-column w-100">
                                {currentState === "Login" ? <></> : (
                                    <MDBInput wrapperClass='mb-4' name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your text' required />
                                )}
                                <MDBInput wrapperClass='mb-4' name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                                <MDBInput wrapperClass='mb-4' name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
                                <MDBBtn type='submit' className="mb-4 w-100">
                                    {currentState === "Sign Up" ? "Create account" : "Login"}
                                </MDBBtn>
                                <div className='check'>
                                    <MDBCheckbox
                                        type='checkbox'
                                        style={{ color: 'black' }}
                                        label={<span style={{ color: 'black', display: 'inline' }}>By continuing, I agree to the terms of use & privacy policy.</span>}
                                        checked={isChecked}
                                        onChange={onCheckboxChange}
                                    />
                                    <span className='clickhere' style={{ display: 'inline-flex', color: 'black', marginBottom: 0 }}>
                                        {currentState === "Login" ? (
                                            <>
                                                Create a new account?
                                                <span onClick={() => setCurrentState("Sign Up")} style={{ cursor: 'pointer', color: 'blue', display: 'block' }}> Click here</span>
                                            </>
                                        ) : (
                                            <>
                                                Already have an account?
                                                <span onClick={() => setCurrentState("Login")} style={{ cursor: 'pointer', color: 'blue', display: 'block' }}> Login here</span>
                                            </>
                                        )}
                                    </span>
                                    <div className='siginwith'>
                                        <p style={{ display: 'inline-flex', color: 'black', marginBottom: 0 }}>Sign in with: </p>
                                        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'Primary' }}>
                                                <FontAwesomeIcon icon={faFacebookF} size="sm" />
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'Primary' }}>
                                                <FontAwesomeIcon icon={faTwitter} size="sm" />
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'Primary' }}>
                                                <FontAwesomeIcon icon={faGoogle} size="sm" />
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'Primary' }}>
                                                <FontAwesomeIcon icon={faGithub} size="sm" />
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </div>
                            </MDBContainer>
                        </MDBCol>
                    </MDBRow>
                </form>
            </MDBContainer>
        </div>
    );
};

export default LoginPopup;
