import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    carUi: {
        padding: '2px 2px',
        fontSize: '22px',
        fontWeight: 500,
        color: 'white',
        background: '#424242',
        border: '2px solid #424242',
        height: '45px',
        width: '45px',
        bottom: '25px',
        display: 'inline-block',
        position: 'fixed',
        top: '86.5%',
        left: '81.8vh',
        borderRadius: '0.2vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.1)',
    },
    mphText: {
        fontSize: '12px',
        color: 'white',
        marginTop: 'auto',
        fontWeight: 500,
    },
    speed: {
        fontSize: '19px',
        fontWeight: 500,
        color: 'white',
        lineHeight: '1',
    },
    speedTextOff: {
        fontSize: '20px',
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        marginTop: '4px',
    },
    iconWrapper: {
        position: 'relative',
        height: 36,
        width: 36,
        marginLeft: 15,
        borderRadius: '0.2vh',
        float: 'left',
        border: '2px solid #424242',
        backgroundColor: '#424242',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconAvatar: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        fontSize: 17,
        color: 'white',
    },
    seatbeltIconFlashing: {
        animation: '$flash linear 1s infinite',
    },
    seatbeltIconAdjust: {
        transform: 'transalte(-50%, -40%)',
    },
    seatbeltContainer: {
        position: 'absolute',
        top: '88.3%',
        left: '19%',
        zIndex: 2,
        transition: '0.6s ease',
    },
    '@keyframes flash': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
    barBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 2,
    },
    bar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1,
    },
}));

const SeatbeltIcon = ({ className, color }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill={color}
        width="25px"
        height="25px"
    >
        <path d="M144 128a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 160V256h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H189.3c-6.6-18.6-24.4-32-45.3-32c-26.5 0-48 21.5-48 48v80c0 35.3 28.7 64 64 64h85.6c8.1 0 14.9 6 15.9 14l10.7 86c2 16 15.6 28 31.8 28h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H332.2L325 358.1c-5-40-39-70.1-79.4-70.1H192zM64 160c0-17.7-14.3-32-32-32s-32 14.3-32 32V320c0 70.7 57.3 128 128 128h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H128c-35.3 0-64-28.7-64-64V160z"/>
    </svg>
);

const CarHud = () => {
    const classes = useStyles();
    const [speedStr, setSpeedStr] = useState('0');

    const carHudData = useSelector((state) => ({
        inVehicle: state.vehicle.showing,
        speed: state.vehicle.speed,
        ignition: state.vehicle.ignition,
        seatbelt: state.vehicle.seatbelt,
        checkEngine: state.vehicle.checkEngine,
        cruise: state.vehicle.cruise,
        speedMeasure: 'MPH',
    }));

    useEffect(() => {
        if (carHudData.speed === 0) {
            setSpeedStr('0');
        } else {
            setSpeedStr(carHudData.speed.toString());
        }
    }, [carHudData.speed]);

    const GetSeatbelt = () => {
        if (!carHudData.inVehicle) return null;
        const seatbeltColor = carHudData.seatbelt ? 'green' : '#ffcc00';
        const seatbeltIconClass = carHudData.seatbelt ? '' : classes.seatbeltIconFlashing;

        return (
            <CSSTransition key="seatbelt" timeout={500} classNames="fade">
                <div className={classes.iconWrapper}>
                    <div className={`${classes.iconAvatar} ${classes.seatbeltIconAdjust} ${seatbeltIconClass}`}>
                        <SeatbeltIcon color={seatbeltColor} />
                    </div>
                    <div className={classes.barBg}>
                        <div className={classes.bar}></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    return (
        <>
            <Fade in={carHudData.inVehicle}>
                <div className={classes.carUi}>
                    <div className={classes.speed}>
                        {carHudData.ignition ? (
                            <div className="row-1">
                                <span id="speed" className="mph-text">
                                    {speedStr}
                                </span>
                            </div>
                        ) : (
                            <span className={classes.speedTextOff}>Off</span>
                        )}
                    </div>
                    {carHudData.ignition && (
                        <span className={classes.mphText}>
                            {carHudData.speedMeasure}
                        </span>
                    )}
                </div>
            </Fade>
            <div className={classes.seatbeltContainer}>
                <TransitionGroup>
                    {GetSeatbelt()}
                </TransitionGroup>
            </div>
        </>
    );
};

export default CarHud;
