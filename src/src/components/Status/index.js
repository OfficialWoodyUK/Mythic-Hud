import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    status: {
        position: 'absolute',
        margin: 'auto',
        width: 'fit-content',
        textAlign: 'center',
        left: 35,
        bottom: 35,
        zIndex: 1,
        transition: '0.6s ease',
        transitionDelay: '0.7s',
    },
    container: {
        display: 'inline-block',
        position: 'fixed',
        bottom: 35,
        left: '16.3%',
        borderRadius: 50,
        transition: '0.6s ease',
        zIndex: 2,
    },
    fuelContainer: {
        position: 'absolute',
        top: '88.3%',
        left: '16.3%',
        zIndex: 2,
        transition: '0.6s ease',
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        fontSize: 17,
        color: 'white',
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

export default withTheme(() => {
    const classes = useStyles();
    const theme = useTheme();

    const config = useSelector((state) => state.hud.config);
    const inVeh = useSelector((state) => state.vehicle.showing);
    const isDead = useSelector((state) => state.status.isDead);
    const health = useSelector((state) => state.status.health);
    const armor = useSelector((state) => state.status.armor);
    const statuses = useSelector((state) => state.status.statuses);
    const fuelHide = useSelector((state) => state.vehicle.fuelHide);
    const fuel = useSelector((state) => state.vehicle.fuel);

    const GetFuel = () => {
        if (!inVeh || fuelHide) return null;
        return (
            <CSSTransition key="fuel" timeout={500} classNames="fade">
                <div className={`${classes.iconWrapper}${fuel <= 10 ? ' low' : ''}`}>
                    {(config.statusIcons || config.statusNumbers) && (
                        <div className={classes.iconAvatar}>
                            {config.statusNumbers ? (
                                <span>{fuel}</span>
                            ) : (
                                <FontAwesomeIcon icon="gas-pump" />
                            )}
                        </div>
                    )}
                    <div className={classes.barBg}>
                        <div className={classes.bar} style={{ background: theme.palette.warning.main, height: `${fuel}%` }}></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const GetHealth = () => {
        if (isDead) {
            return (
                <CSSTransition key="health" timeout={500} classNames="fade">
                    <div className={classes.iconWrapper}>
                        {(config.statusIcons || config.statusNumbers) && (
                            <div className={classes.iconAvatar}>
                                <FontAwesomeIcon icon="skull-crossbones" />
                            </div>
                        )}
                        <div className={classes.barBg}>
                            <div className={classes.bar} style={{ background: '#424242', height: `100%` }}></div>
                        </div>
                    </div>
                </CSSTransition>
            );
        } else {
            return (
                <CSSTransition key="health" timeout={500} classNames="fade">
                    <div className={`${classes.iconWrapper}${health <= 10 ? ' low' : ''}`}>
                        {(config.statusIcons || config.statusNumbers) && (
                            <div className={classes.iconAvatar}>
                                {config.statusNumbers ? (
                                    <span>{health}</span>
                                ) : (
                                    <FontAwesomeIcon icon="heart" />
                                )}
                            </div>
                        )}
                        <div className={classes.barBg}>
                            <div className={classes.bar} style={{ background: theme.palette.success.main, height: `${health}%` }}></div>
                        </div>
                    </div>
                </CSSTransition>
            );
        }
    };

    const GetArmor = () => {
        if (armor <= 0 || isDead) return null;
        return (
            <CSSTransition key="armor" timeout={500} classNames="fade">
                <div className={classes.iconWrapper}>
                    {(config.statusIcons || config.statusNumbers) && (
                        <div className={classes.iconAvatar}>
                            {config.statusNumbers ? (
                                <span>{armor}</span>
                            ) : (
                                <FontAwesomeIcon icon="shield" />
                            )}
                        </div>
                    )}
                    <div className={classes.barBg}>
                        <div className={classes.bar} style={{ background: theme.palette.info.main, height: `${armor}%` }}></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const GetStatusElement = (status, i) => {
        if ((status.value >= 90 && status?.options?.hideHigh) || (status.value === 0 && status?.options?.hideZero) || (isDead && !status?.options?.visibleWhileDead))
            return null;

        return (
            <CSSTransition key={`status-${i}`} timeout={500} classNames="fade">
                <div className={`${classes.iconWrapper}${((!status.inverted && status.value <= 10) || (status.inverted && status.value >= 90)) && status.flash ? ' low' : ''}`}>
                    {(config.statusIcons || config.statusNumbers) && (
                        <div className={classes.iconAvatar}>
                            {config.statusNumbers ? (
                                <span>{status.value}</span>
                            ) : (
                                <FontAwesomeIcon icon={status.icon ?? 'question'} />
                            )}
                        </div>
                    )}
                    <div className={classes.barBg}>
                        <div className={classes.bar} style={{ background: status.color ? status.color : theme.palette.text.primary, height: `${status.value}%` }}></div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const statusElements = statuses.sort((a, b) => a.options.id - b.options.id).map((status, i) => GetStatusElement(status, i));

    return (
        <>
            <div className={classes.fuelContainer}>
                <TransitionGroup>
                    {GetFuel()}
                </TransitionGroup>
            </div>
            <div className={`${classes.status} ${inVeh ? classes.container : ''}`}>
                <TransitionGroup>
                    {GetHealth()}
                    {GetArmor()}
                    {statusElements}
                </TransitionGroup>
            </div>
        </>
    );
});

