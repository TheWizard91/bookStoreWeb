
function getDeviceType() {
    const userAgent = navigator.userAgent;
  
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return "Mobile";
    } else if (/iPad/i.test(userAgent)) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  }
  
  console.log(getDeviceType()); // Outputs "Mobile", "Tablet", or "Desktop"