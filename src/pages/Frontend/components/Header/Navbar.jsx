import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  let navigate = useNavigate();

  const { isAuthenticated, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <FaCheck size={26} /> TODO LIFE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/todos" className="nav-link text-primary">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-primary">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link text-primary">
                Contact
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {!isAuthenticated ? (
              <Link
                to="/authentication/login"
                className="btn btn-primary btn-sm"
                type="submit"
              >
                Login
              </Link>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Link
                      to="/dashboard"
                      className="text-dark"
                      type="submit"
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <Link
to="/dashboard"
className="btn btn-primary btn-sm me-2"
type="submit"
>
Dashboard
</Link>
<buuton
className="btn btn-primary btn-sm"
onClick={handleLogout}
>
Logout
</buuton> */
}
