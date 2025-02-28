import '@babel/polyfill';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import {
    ThemeProvider,
    createTheme,
    StyledEngineProvider,
} from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Action from '../Action';
import Hud from '../Hud';
import Notifications from '../Notifications';
import List from '../../components/List';
import Input from '../../components/Input';
import Confirm from '../../components/Confirm';
import InfoOverlay from '../../components/InfoOverlay';
import { Progress, ThirdEye, GemTable } from '../../components';

import Interaction from '../../components/Interaction';

import LCD from '../../assets/fonts/lcd.ttf';
import SniperScope from '../../components/SniperScope';
import Crosshair from '../../components/Crosshair';
import Dead from './Dead';
import Blindfold from './Blindfold';
import Ingredients from '../../components/Meth';
import DeathTexts from './DeathTexts';
import Arcade from '../Arcade';
import Flashbang from './Flashbang';

library.add(fab, fas);

const LCDFont = {
    fontFamily: 'LCD',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      url(${LCD}) format('truetype')
    `,
};

const App = ({ hidden }) => {
    const progShowing = useSelector((state) => state.progress.showing);
    const isLis = useSelector((state) => state.list.showing);
    const isInp = useSelector((state) => state.input.showing);
    const isConf = useSelector((state) => state.confirm.showing);
    const isMeth = useSelector((state) => state.meth.showing);

    const muiTheme = createTheme({
        typography: {
            fontFamily: ['Oswald'],
        },
        palette: {
            primary: {
                main: '#41bd86',
                light: '#3b6e57',
                dark: '#560000',
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#141414',
                light: '#1c1c1c',
                dark: '#0f0f0f',
                contrastText: '#ffffff',
            },
            error: {
                main: '#6e1616',
                light: '#a13434',
                dark: '#430b0b',
            },
            success: {
                main: '#52984a',
                light: '#60eb50',
                dark: '#244a20',
            },
            warning: {
                main: '#f09348',
                light: '#f2b583',
                dark: '#b05d1a',
            },
            info: {
                main: '#247ba5',
                light: '#247ba5',
                dark: '#175878',
            },
            success: {
                main: '#52984a',
                light: '#60eb50',
                dark: '#244a20',
            },
            warning: {
                main: '#f09348',
                light: '#f2b583',
                dark: '#b05d1a',
            },
            info: {
                main: '#247ba5',
                light: '#247ba5',
                dark: '#175878',
            },
            text: {
                main: '#ffffff',
                alt: '#A7A7A7',
                info: '#919191',
                light: '#ffffff',
                dark: '#000000',
            },
            alt: {
                green: '#008442',
                greenDark: '#064224',
            },
            border: {
                main: '#e0e0e008',
                light: '#ffffff',
                dark: '#26292d',
                input: 'rgba(255, 255, 255, 0.23)',
                divider: 'rgba(255, 255, 255, 0.12)',
            },
            mode: 'dark',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        '.fade-enter': {
                            opacity: 0,
                        },
                        '.fade-exit': {
                            opacity: 1,
                        },
                        '.fade-enter-active': {
                            opacity: 1,
                        },
                        '.fade-exit-active': {
                            opacity: 0,
                        },
                        '.fade-enter-active, .fade-exit-active': {
                            transition: 'opacity 500ms',
                        },
                        '@font-face': [LCDFont],
                    },
                    html: {
                        background:
                            process.env.NODE_ENV != 'production'
                                ? '#1e1e1e'
                                : 'transparent',
                        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
                            {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                    },
                    '@keyframes critical': {
                        '0%, 49%': {
                            backgroundColor: '#0f0f0f',
                        },
                        '50%, 100%': {
                            backgroundColor: '#1b1c2c',
                        },
                    },
                    '@keyframes critical-border': {
                        '0%, 49%': {
                            borderColor: '#ffffffc7',
                        },
                        '50%, 100%': {
                            borderColor: `#de3333`,
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: '#0f0f0f',
                    },
                },
            },
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Dead />
                <Blindfold />
                <Flashbang />
                <DeathTexts />
                <InfoOverlay />
                <Hud />
                <Notifications />
                <Action />
                {isMeth && <Ingredients />}
                {isLis && <List />}
                {isInp && <Input />}
                {isConf && <Confirm />}
                {progShowing && <Progress />}
                <ThirdEye />
                <Interaction />
                <Crosshair />
                <SniperScope />
                <GemTable />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

App.propTypes = {
    hidden: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ hidden: state.app.hidden });

export default connect(mapStateToProps)(App);
