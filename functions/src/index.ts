import * as functions from "firebase-functions";

var admin = require("firebase-admin");

var serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db =admin.firestore();

exports.addData = functions.https.onCall(async(data,context)=>{
    const uid=context.auth?.uid || "without user";
    try {
        await db.collection(uid).add({ nombre: data.nombre,dia:data.dia,hora:data.hora });
        return {message:'success'}
    } catch (err) {
        return {message:`issue: ${err}`}
    }
})

exports.deleteData = functions.https.onCall(async(data,context)=>{
    const uid =context.auth?.uid || "without user";
    try{
        await db.collection(uid).doc('/'+data.id+'/').delete();
        return {message:'success'}
    }catch(err){
        return {message:`issue: ${err}`}
    }
})