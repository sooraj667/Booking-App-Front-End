import React,{useState} from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
const actions = [
  { icon: <FileCopyIcon />, name: "Workshops" },
//   { icon: <SaveIcon />, name: "Save" },
//   { icon: <PrintIcon />, name: "Print" },
//   { icon: <ShareIcon />, name: "Share" },
];

const WorkShopSpeedDial = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSpeedDialClick=(name)=>{
    if(name==="Workshops"){
        props.toggleW((prev)=>!prev)
        props.toggleR(false)
        props.toggleBN(false)

    }
  }
  return (
    <Box sx={{ height:80, transform: "translateZ(0px)", flexGrow: 1, }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: -61, }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={()=>handleSpeedDialClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default WorkShopSpeedDial;
