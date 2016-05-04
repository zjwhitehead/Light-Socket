exports.shadow = function()
{
  var awsIot = require('aws-iot-device-sdk');
  var thingShadows = awsIot.thingShadow({
    keyPath: "./cert/9c6-private.pem.key",
    certPath: "./cert/9c6-certificate.pem.crt",
    caPath: "./cert/root-CA.crt",
    region: "us-east-1",
    clientId: "TrafficLight"
  });

  console.log("loaded iot");
  return thingShadows;
}
