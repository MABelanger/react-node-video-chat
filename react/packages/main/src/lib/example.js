var c = new RTCPeerConnection({
    iceServers: [     // Information about ICE servers - Use your own!
      {
        'urls': 'stun:stun.l.google.com:19302'
      }
    ]});

c.createOffer(
    function (offer){
        c.setLocalDescription(offer)
    },
    function () {},
    {mandatory: {OfferToReceiveAudio:true}})

    