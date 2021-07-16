import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import './profile.css'
import { withRouter } from "react-router";
import  {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop:"8%",
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const signOut = () => {
  localStorage.removeItem('usertoken');
  window.location.reload()
}

 function SimplePopper(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <PermIdentityIcon className="proicon" aria-describedby={id} type="button" onClick={handleClick} />
      <span></span>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div className="profmaindiv">
            Welcome
            <p>To access account and manage orders</p>
            <button className="profbtn" style={{cursor:'pointer'}} onClick={signOut}>SIGNOUT</button>
          </div>
          <div className="horizoantalline"><hr/></div>
          {/* <div className="profstore">
            <MarkunreadMailboxOutlinedIcon style={{fontSize:"15", color:"gray"}} />
            <p>My orders</p>
          </div> */}
          <Link to="/wishlist">
          <div className="profwish">
            <FavoriteBorderOutlinedIcon style={{fontSize:"15", color:"gray"}} />
            <p>Wishlist</p>
          </div>
          </Link>
        </div>
      </Popper>
    </>
  );
}
export default withRouter(SimplePopper);