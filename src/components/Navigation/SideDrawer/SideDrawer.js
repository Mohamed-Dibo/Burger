import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Model/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}> 
            <Logo />
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuthenticated} />
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer
