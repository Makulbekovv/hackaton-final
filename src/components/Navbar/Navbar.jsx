import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ClientContext } from "../../contexts/ClientProvider";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { AdminContext } from "../../contexts/AdminProvider";
import LogoutIcon from "@mui/icons-material/Logout";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar(props) {
  const { cartCount } = React.useContext(ClientContext);
  const { favoriteCount, getDetail } = React.useContext(ClientContext);
  const { user, logout } = React.useContext(AdminContext);
  // console.log(logout);
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getPosts } = React.useContext(ClientContext);
  const [searchValue, setSearchValue] = React.useState(search.get("q") || "");
  const [colorValue, setColorValue] = React.useState(search.get("color") || "");
  const [priceValue, setPriceValue] = React.useState(
    search.get("price_lte" || "")
  );
  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    setColorValue(search.get("color") || "");
    setPriceValue(search.get("price_lte" || ""));
    getPosts();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  console.log(user);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="nav">
      <Box sx={{ flexGrow: 1 }} color="inherit">
        <AppBar
          style={{ backgroundColor: "black", color: "#fff" }}
          position="static"
          sx={{
            // backgroundColor: "primary",
            position: "relative",
            zIndex: "4",
          }}
        >
          <Toolbar>
            <Link to="/">
              <Button
                variant="h6"
                // noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Kross
              </Button>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/add">
                <Button
                  color="warning"
                  sx={{ my: 2, ml: 3, color: "white", display: "block" }}
                >
                  ADD PRODUCT
                </Button>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="/admin-panel">
                  <Button
                    color="warning"
                    sx={{ my: 2, ml: 4, color: "white", display: "block" }}
                  >
                    ADMIN PANEL
                  </Button>
                </Link>
              </Box>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => filterProducts("q", e.target.value)}
                variant="outlined"
                placeholder="Живой поиск"
              />
            </Search>

            <Box sx={{ flexGrow: 0 }}>
              <Link to="/cart">
                <IconButton size="large" color="inherit">
                  <Badge color="error" badgeContent={cartCount}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Link to="favorite">
                <IconButton size="large" color="inherit">
                  <Badge color="error" badgeContent={favoriteCount}>
                    <StarOutlineOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            {user?.email ? (
              <>
                {user?.email}
                <Button style={{ color: "white" }} onClick={() => logout()}>
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: "white" }}>
                  <Link to="/register">
                    <AssignmentLateIcon />
                  </Link>
                </Button>
                <Button sx={{ color: "white" }}>
                  <Link to="/signin">
                    <AssignmentIndIcon />
                  </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}
