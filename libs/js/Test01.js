console.log("0.12");

function myBrowser () {
    
    if(window.navigator.userAgent.split("safari") != null){
        alert("Safari Browser");
    }
    else if(window.navigator.userAgent.split("chorme") != null){
        alert("Chorme Browser");
    }
}

myBrowser();