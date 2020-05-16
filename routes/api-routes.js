const fs = require("fs")
module.exports = (app) => {
    app.get("/api/notes", async (req, res) => {
        res.json(await obtainAllNotes());
    });
    app.post("/api/notes", (req, res) => {
        console.log("note to be saved " + JSON.stringify(req.body));
        saveNote(req).then((data) => {
            console.log("Notes Have been saved and delivered!")
            res.json(data)
        });
    });
    app.delete("/api/notes/:id", (req, res) => {
        deleteNote(req).then((data) => {
            console.log("Note sas been deleted and saved notes delivered!")
            res.json(data)
        });
        
    });
};

// 1st way to get db.json data
async function obtainAllNotes() {
    try{
        const data = await fs.promises.readFile("./db/db.json", "utf8");
        return JSON.parse(data);
    }catch(err){
        console.log(err);
    }
}

// 2nd way to get db.json data
let obtainNotes = async function () {
    try {
        const data = await fs.promises.readFile("./db/db.json", "utf8");
        return Promise.resolve(JSON.parse(data));
    } catch (err) {
        console.log(err);
    }
}

// 3rd way to get db.json data
function getNotes(res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
}

// write to db
async function write(saveNotes) {
    let error = await fs.promises.writeFile("./db/db.json", JSON.stringify(saveNotes, null, 2));
    if (error) throw error;
    console.log("note has been written");
}

// save notes to new array
async function saveNote(req) {
    try {
        let data = await fs.promises.readFile("./db/db.json", "utf8");
        let dataJSON = JSON.parse(data);
        let currentData;
        if(req.body.id){
            console.log("We got an update, not a new Note!")
            currentData = dataJSON.filter((data) => {
                return data.id != req.body.id
            })
        }else{
            currentData = dataJSON;
            req.body.id = Math.random();
        }
        let newNotes  = [...currentData, req.body];
        await write(newNotes);
        return Promise.resolve(newNotes);
    } catch (err) {
        console.log(err);
    }
}
async function deleteNote(req) {
    try {
        let data = await fs.promises.readFile("./db/db.json", "utf8");
        let dataJSON = JSON.parse(data);
        let newNotes = dataJSON.filter((data) => {
            return data.id != req.params.id
        })
        await write(newNotes);
        return Promise.resolve(newNotes);
    } catch (err) {
        console.log(err);
    }
}


// let error = await fs.promises.writeFile("./db/db.json", JSON.stringify(saveNotes, null, 2), (err) => {
//     if (error) throw err;
//     console.log("note has been written");
// });