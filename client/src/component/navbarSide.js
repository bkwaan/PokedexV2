import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/Selectors/user";

import { logout } from "../redux/actions/user";
import { Navbar, Offcanvas, Container, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CgPokemon } from "react-icons/cg";
import { HiOutlineMenu } from"react-icons/hi"
import { useNavigate } from "react-router-dom";

const NavbarSide = () => {
    const [show, setShow] = useState(false);
    const { ValidOtp } = useSelector(getUser)
    const navigate =  useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{}, [ValidOtp])

    const logOut = () => {
        dispatch(logout())
    }

    const logIn = () => {
        navigate('/login')
    }

    const HandleNavigate = (path) =>{
        navigate(path)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
            <>
                <HiOutlineMenu className="MenuButton" onClick={handleShow} size={45}/>
                <Offcanvas placement="start" show={show} onHide={handleClose} className='NavCanvas'>
                    <Offcanvas.Header closeButton>
                        <span className="NavPlaceHolder" />
                        <Offcanvas.Title className='NavTitle'>Pokedex</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="NavContainer">
                            <div className="NavLinkContainer">
                                <div className='NavLink' onClick={() =>{HandleNavigate('/')}}>
                                    <CgPokemon size={50} color='black'  className='PokeBall' />
                                    <span className="LinkText">Home</span>
                                </div>
                                <div className='NavLink' onClick={() =>{HandleNavigate('/Profile')}}>
                                    <CgPokemon size={50} color='black' className='PokeBall' />
                                    <span className="LinkText">Profile </span>
                                </div>
                            </div>
                            <div onClick={ValidOtp? logOut: logIn}className="logout">{ValidOtp? 'Logout': 'Login'}</div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
    );
};

export default NavbarSide;
