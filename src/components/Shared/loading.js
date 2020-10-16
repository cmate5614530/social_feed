import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(props) {
    return (
    <div style={{display:"flex", justifyContent:"center",alignItems:"center", ...props.style}}>
    <CircularProgress style={{ height:25,
    width:25}}
 style={{height:"25px", width:"25px"}}
 color="secondary" /> 
 </div>
    )
}