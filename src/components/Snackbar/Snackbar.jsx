import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles, withStyles} from '@material-ui/core'

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '10px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function SnackBar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

   const resType = (type) => {
    return type;
  };
    

   const Message = (message) => {
     setOpen(true);
    return message;
  };

  return (
    <div >
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} >
          <Alert severity={resType}>
            <Message />
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}