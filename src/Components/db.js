// EDITING STARTS HERE (you dont need to edit anything above this line)
// https://pouchdb.com/getting-started.html

// 👇 SETUP LOCAL AND REMOTE DB 👇
//  🐦 Define DB here
import PouchDB from "pouchdb";
var db = new PouchDB("bluebirdDB");

db.info().then(function (info) {
  console.log("We have a database: " + JSON.stringify(info));
});
var remoteCouch = false;
// var remoteCouch = 'http://localhost:5984/bluebird'
// http://127.0.0.1:5984/_utils/#

// 🐦 If remoteCouch defined sync
if (remoteCouch) {
  sync();
}

// 👇 SETUP SYNC 👇
// 🐦 sync - replicate to or from remote DB to local
function sync() {
  syncDom.setAttribute("data-sync-state", "syncing");
  var opts = {
    live: true,
  };
  db.replicate.to(remoteCouch, opts, syncError);
  db.replicate.from(remoteCouch, opts, syncError);
}

var syncDom = document.getElementById("sync-wrapper");

// There was some form or error syncing
function syncError() {
  syncDom.setAttribute("data-sync-state", "error");
}

// 🐦  If new changes made to DB, display

/** 
  db.changes({
  since: "now",
  live: true,
}).on("change", showPayload);
*/

// 👇 SAVE TO DB 👇
// 🐦 addPayload - adds incoming data from BLE Device to PouchDB
// called in handleChangedValue()
function addPayload(data) {
  // bluebirdPayload - doc/row in DB
  var bluebirdPayload = {
    _id: new Date().toISOString(),
    title: data,
  };

  db.put(bluebirdPayload, function callback(err, result) {
    if (!err) {
      console.log(
        "Successfully added payload to DB: " + JSON.stringify(bluebirdPayload)
      );
    }
  });
}

// 🐦 showPayload - Shows Payload
// For now shows the payload via Console
// Comment console.log if it's distracting
function showPayload() {
  db.allDocs(
    {
      include_docs: true,
      descending: true,
    },
    function (err, doc) {
      //console.log(doc.rows);
    }
  );
}

export default db;
export { addPayload, showPayload };
