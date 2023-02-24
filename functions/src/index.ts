import * as functions from "firebase-functions";

var admin = require("firebase-admin");

var serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db =admin.firestore();
//al crear user

exports.userCreated = functions.auth.user().onCreate(async (user) => {
    await db.collection('users').doc('/' + user.uid + '/').create({ email: user.email})
})

//basics
exports.addData = functions.https.onCall(async(data,context)=>{
    const uid=context.auth?.uid || "without user";
    try {
        await db.collection('users').doc(uid).collection('materias').add({ nombre: data.nombre,dia:data.dia,hora:data.hora })
        return {message:'success'}
    } catch (err) {
        return {message:`issue: ${err}`}
    }
})

exports.deleteData = functions.https.onCall(async(data,context)=>{
    const uid =context.auth?.uid || "without user";
    try{
        await db.collection('users').doc(uid).collection('materias').doc(data.id).delete();
        return {message:'success'}
    }catch(err){
        return {message:`issue: ${err}`}
    }
})
//records

exports.recordsAdd = functions.https.onCall(async(data,context)=>{
    const uid=context.auth?.uid || "without user";
    const date = new Date()
    try {
        await db.collection('users').doc(uid).collection('records').add({ nombre: data.nombre,dia:data.dia,hora:data.hora,date:date,estado:'agregado' })
        return {message:'success'}
    } catch (err) {
        return {message:`issue: ${err}`}
    }
})
exports.recordsDelete = functions.https.onCall(async(data,context)=>{
    const uid=context.auth?.uid || "without user";
    const date = new Date()
    try {
        await db.collection('users').doc(uid).collection('records').add({ nombre: data.nombre,dia:data.dia,hora:data.hora,date:date,estado:'borrado' })
        return {message:'success'}
    } catch (err) {
        return {message:`issue: ${err}`}
    }
})