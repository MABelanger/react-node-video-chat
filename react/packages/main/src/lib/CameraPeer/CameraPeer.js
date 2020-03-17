import React, { useRef, useEffect } from 'react';
import * as rtcPeerUtils from './rtcPeerUtils';

export function CameraPeer (props) {

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);


    useEffect(()=>{
        rtcPeerUtils.start(localVideoRef.current, remoteVideoRef.current)
    },[])

    

    return (
        <>
            <video ref={localVideoRef} autoPlay></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </>
    );

}