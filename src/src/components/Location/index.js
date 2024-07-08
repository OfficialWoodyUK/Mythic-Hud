import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    locationContainer: {
        position: 'fixed',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000, // Ensure it's above other content
    },
    location: {
        padding: '2px 2px',
        fontSize: '22px',
        fontWeight: 500,
        color: 'white',
        background: '#424242',
        border: '2px solid #424242',
        height: '45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.2vh',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.1)',
    },
    locationMain: {
        color: 'white',
        fontSize: 20,
    },
    locationSecondary: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
    },
    directionBox: {
        position: 'fixed',
        bottom: '25px',
        left: 'calc(95vh - 45px)',
        top: '86.5%',
        padding: '2px 2px',
        fontSize: '22px',
        fontWeight: 500,
        color: 'white',
        background: '#424242',
        border: '2px solid #424242',
        height: '45px',
        width: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.2vh',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    directionTextContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    directionText: {
        fontSize: '25px',
        color: 'white',
        fontWeight: 500,
    },
}));

const Location = () => {
    const classes = useStyles();
    const isShowing = useSelector((state) => state.location.showing);
    const location = useSelector((state) => state.location.location);
    const inVehicle = useSelector((state) => state.vehicle.showing);
    const isBlindfolded = useSelector((state) => state.app.blindfolded);

    if (!isShowing || isBlindfolded || !inVehicle) return null;

    return (
        <>
            <div className={classes.locationContainer}>
                <div className={classes.location}>
                    <div className={classes.locationMain}>
                        {location.main}
                        <span className={classes.locationSecondary}>
                            {location.cross !== '' ? (
                                <span>
                                    <span className={classes.highlight}> x </span>
                                    {location.cross}
                                </span>
                            ) : null}
                        </span>
                        <span className={classes.highlight}> | </span>
                        <span className={classes.areaWrap}>{location.area}</span>
                    </div>
                </div>
            </div>
            <div className={classes.directionBox}>
                <div className={classes.directionTextContainer}>
                    <span className={classes.directionText}>{location.direction}</span>
                </div>          
            </div>
        </>
    );
};

export default Location;
