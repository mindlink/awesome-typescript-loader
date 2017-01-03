"use strict";
function createQueuedSender(childProcess) {
    var msgQueue = [];
    var isSending = false;
    var doSendLoop = function () {
        var msg = msgQueue.shift();
        childProcess.send(msg, function (error) {
            if (error) {
                console.error(error);
            }
            if (msgQueue.length > 0) {
                setImmediate(doSendLoop);
            }
            else {
                isSending = false;
            }
        });
    };
    var send = function (msg) {
        msgQueue.push(msg);
        if (isSending) {
            return;
        }
        isSending = true;
        doSendLoop();
    };
    return { send: send };
}
exports.createQueuedSender = createQueuedSender;
//# sourceMappingURL=send.js.map