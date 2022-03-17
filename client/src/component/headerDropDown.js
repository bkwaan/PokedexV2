import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/Selectors/user";
import { Dropdown } from "react-bootstrap";
import { BiUser } from "react-icons/bi";
import { DropdownButton } from "react-bootstrap";
import { logout } from "../redux/actions/user";

const HeaderDropDown = () => {
    const { ValidOtp } = useSelector(getUser)
    const dispatch = useDispatch()

    const logOut = () =>{
        dispatch(logout())
    }

    return (
        <DropdownButton id="dropdown-basic-button" title={<BiUser size={25}/>} variant='secondary' size="md">
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            {ValidOtp &&
                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
            }
        </DropdownButton>
    );
};

export default HeaderDropDown;
