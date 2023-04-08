import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import "../pages/Home/home.scss";
import { AreaChart, Area } from "recharts";
// import Chart from "../../components/chart/Chart";
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const Logistics = () => {
    const QontoConnector = withStyles({
        alternativeLabel: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        active: {
            '& $line': {
                borderColor: '#784af4',
            },
        },
        completed: {
            '& $line': {
                borderColor: '#784af4',
            },
        },
        line: {
            borderColor: '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
    })(StepConnector);
    
    const useQontoStepIconStyles = makeStyles({
        root: {
            color: '#eaeaf0',
            display: 'flex',
            height: 22,
            alignItems: 'center',
        },
        active: {
            color: '#784af4',
        },
        circle: {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
        completed: {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
    });
    
    function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;
    
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
            </div>
        );
    }
    
    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         */
        active: PropTypes.bool,
        /**
         * Mark the step as completed. Is passed to child components.
         */
        completed: PropTypes.bool,
    };
    
    const ColorlibConnector = withStyles({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        completed: {
            '& $line': {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor: '#eaeaf0',
            borderRadius: 1,
        },
    })(StepConnector);
    
    const useColorlibStepIconStyles = makeStyles({
        root: {
            backgroundColor: '#ccc',
            zIndex: 1,
            color: '#fff',
            width: 50,
            height: 50,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        active: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        },
    });
    
    function ColorlibStepIcon(props) {
        const classes = useColorlibStepIconStyles();
        const { active, completed } = props;
        const icons = {
            1: <MonetizationOnIcon />,
            2: <LocalShippingIcon />,
            3: <CheckCircleIcon />,
        };
    
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {icons[String(props.icon)]}
            </div>
        );
    }
    
    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         */
        active: PropTypes.bool,
        /**
         * Mark the step as completed. Is passed to child components.
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };
    
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));
    
    function getSteps() {
        return ['Transaction Successful', 'Shipped', 'Delivered'];
    }
    
    function getStepContent(step) {
        switch (step) {
            case 0:
                return 'Your transaction has been successful !';
            case 1:
                return 'Your order has been shipped at will arrive soon at your doorstep !';
            case 2:
                return 'Your package has been successfully delivered !';
            default:
                return 'Your transaction has been successful !';
        }
    }
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    }; 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className={classes.root} style={{backgroundColor:"white"}}>
            <br />
            {/* <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper> */}

            <h1 style={{ textAlign: "center", fontSize:"30px", fontWeight:"bold", marginRight:"140px" }}>Logistics Dashboard</h1>
            <div style={{ margin: "2%", width:"60%",marginLeft:"10%", display: "flex", borderRadius: "30px", boxShadow: "5px 5px 25px 5px black" }}>
                <div>
                    <img style={{ margin: "10%", padding: "10px", width: "250px", borderRadius: "30px", boxShadow: "5px 5px 25px 5px black" }} src="https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg" alt="orderpackage" />

                </div>
                <div style={{ marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
                    <h3>Item details:</h3>
                    <h1>Cement</h1>
                    <p>Quantity: 55 units</p>
                    <p>Dimensions: 3meter X 1meter</p>
                    <p>ETA: 2nd April, 2022</p>
                </div>



            </div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions} style={{ textAlign: "center" }}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
      </div>
  );
};

export default Logistics;



