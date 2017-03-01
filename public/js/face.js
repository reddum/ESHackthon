$(document).ready(function() {
    $('#screenShotBut').click(screenShotButHendler);
    $('#screenLoginBut').click(screenLoginButHendler);
    $("#sendFaceBut").hide();
    $("#screenShotVideo").hide();
    videoInit();
});

var video;
var canvas;
var width;
var streaming;
var FaceMap = {};
var gender;
var PERSONGROUP_ID = "mtcbotdemo";
var FACE_KEY = "";
var MAXNumOf_CA_Returned = 1;
var CONFID_THRESHOLD = 0.5;

function videoInit() {

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: false, video: true },
            function(stream) {
                video = document.querySelector('video');
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = function(e) {
                    video.play();
                };
                video.addEventListener('canplay', function(ev) {
                    canvas = document.getElementById('screenShotVideo');
                    width = video.videoWidth;
                    video.setAttribute('width', width);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', video.videoHeight);
                }, false);
            },
            function(err) {
                console.log("The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
}


function screenLoginButHendler() {
    $("#Console").val("Welcome Back !! 帳密登入");
    setTimeout(function() { window.location.href = 'eusansystem.html'; }, 1000);
}

function screenShotButHendler() {
    var context = canvas.getContext('2d');
    console.log(width);
    context.drawImage(video, 0, 0, width, canvas.height);
    $("#Console").val("上傳圖片...");
    faceDetect();
    //$("#sendFaceBut").show();
}

function sendFaceButHendler() {
    $("#Console").val("上傳圖片...");
    faceDetect();
}

function faceDetect() {
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender"
    };

    //var azure = require('azure-storage');
    //var blob = azure.createBlobService('13threaltimeinsight', 'fKxio8XGO776YjVV84gDgbYmVQiOdtGtiS9m/8AGoL1xPGK3Yyqso+lgz8wKCyG0vzZVi+UQvyn9L+e+K1CC/w==');
    canvas.toBlob(function(blob) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.projectoxford.ai/face/v1.0/detect?' + $.param(params), true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", FACE_KEY);
        xhr.onload = function(response) {

            if (eval(response.currentTarget.status) == 200) {

                console.log(eval(response.currentTarget.response));
                var JsonResponse = JSON.parse(response.currentTarget.response);
                console.log("hi face" + JsonResponse[0]);
                var faceID = [];
                faceID.push(JsonResponse[0].faceId);
                sendIdentifyFace(PERSONGROUP_ID, faceID, MAXNumOf_CA_Returned, CONFID_THRESHOLD);
            }

        };
        xhr.send(blob);

    }, "image/jpeg", 0.5);
}

function sendIdentifyFace(personGroupId, faceIds, maxNumOfCandidatesReturned, confidenceThreshold) {
    var identify_reqbody = {
        "personGroupId": personGroupId,
        "faceIds": faceIds,
        "maxNumOfCandidatesReturned": maxNumOfCandidatesReturned,
        "confidenceThreshold": confidenceThreshold
    };
    $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/identify",
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FACE_KEY);
            },
            type: "POST",
            // Request body
            data: JSON.stringify(identify_reqbody),
        })
        .done(function(data) {
            //alert("success");
            var Jsondata = JSON.parse(JSON.stringify(data));
            console.log(Jsondata);
            if (Jsondata[0].candidates.length == 0) {
                $("#Console").val("查無此人");
            } else {
                console.log(Jsondata[0].candidates[0].personId);
                getPersonInfo(personGroupId, Jsondata[0].candidates[0].personId);
            }
        })
        .fail(function() {
            alert("error");
        });

}

function getPersonInfo(PersonGroupId, PersonId) {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + PersonGroupId + "/persons/" + PersonId.toString() + "?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FACE_KEY);
            },
            type: "GET",
            // Request body
        })
        .done(function(data) {
            // alert("success");
            var Jsondata = JSON.parse(JSON.stringify(data));
            console.log(Jsondata.name);
            $("#Console").val("Welcome Back !!  " + Jsondata.name);
            getAuthToken(function(data) {
                setTimeout(function() { window.location.href = 'speech?u=' + Jsondata.name; }, 1000);
            });

        })
        .fail(function() {
            alert("error");
        });
}

function getAuthToken(callback) {
    $.ajax({
            url: "/oauth/authorize",
            type: "POST",
            dataType: 'json',
        })
        .done(function(data) {
            // alert("success");
            console.log(data);
            callback(data);

        })
        .fail(function() {
            console.log("error");
        });
}