export async function start(localVideoRef, remoteVideoRef){
    // Get the user webcam and mic represented by an instance of MediaStream
    const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});

    // Preview this stream on the <video> element to the left (local preview)
    localVideoRef.srcObject = stream;

    // Create a couple of peer connections with default options
    const pc1 = new RTCPeerConnection();
    const pc2 = new RTCPeerConnection();

    // Listen for ICE candidate on our PCs
    pc1.addEventListener('icecandidate', ({candidate}) => {
        if (candidate){
            pc2.addIceCandidate(candidate)
        }
    })

    pc2.addEventListener('icecandidate', ({candidate}) => {
        if (candidate){
            pc1.addIceCandidate(candidate)
        }
    })
    // pc2.addEventListener('icecandidate', ({candidate}) => if (candidate) pc1.addIceCandidate(candidate));

    // Get tracks from our local stream (one for audio and one for video) and add them to pc1
    stream.getTracks().forEach(track => pc1.addTrack(track, stream));

    // Listen on our second PC for tracks to be received from our first PC.
    pc2.addEventListener('track', (streams: [stream])=>{
        // Display the remote media stream on the <video> element to the left (remote preview)
        remoteVideoRef.srcObject = stream;
    })

    // Create an Session Description protocol (SDP) offer
    const offer = await pc1.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    });

    // Set the offer on local and remote PCs
    await pc1.setLocalDescription(offer);
    await pc2.setLocalDescription(offer);

    // Create and SDP answer
    const answer = await pc2.createAnswer();

    // Set answer on local and remote PCs
    await pc2.setLocalDescription(answer);
    await pc1.setRemoteDescription(answer);
}