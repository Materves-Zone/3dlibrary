console.log("0.14");

function myBrowser () {
    
    var Broswer = window.navigator.userAgent;
    alert(Broswer.match("iPhone"));
    console.log(Broswer);
    // var BrowserVerName = window.navigator.userAgent.split('/');
    // console.log(BrowserVerName[BrowserVerName.length-2]);
    // console.log(BrowserVerName[1]);
    // var BroswerName = BrowserVerName[BrowserVerName.length-2].split(' ');
    // console.log(BroswerName[BroswerName.length-1]);
    // var BrowserPlatform = BrowserVerName[1].split(' ');
    // console.log(BrowserPlatform[1]);
    // alert("This is " + BrowserPlatform[1] + "  with  " + BroswerName[BroswerName.length-1] + "  Browser!");

}

myBrowser();