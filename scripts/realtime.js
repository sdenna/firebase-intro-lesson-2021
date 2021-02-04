// This file will have the JS needed for displaying and interacting with
// elements on the screen

var nameV, idV, ageV, yearV;    // values of the input boxes in the HTML

function ready() {
    nameV = document.getElementById('name').value;
    idV = document.getElementById('idNum').value;
    ageV = document.getElementById('age').value;
    yearV = document.getElementById('year').value;
}

// INSERT FUNCTIONALITY - ONCLICK

document.getElementById('insert').onclick = () => {
    ready();

    db.collection('student').add({
        nameOfStudent: nameV,
        idNum: idV,
        age: ageV,
        year: yearV
    }).catch(e => console.log(e.message));
}

// SEARCH/SHOW DATA FUNCTIONALITY - ONCLICK

document.getElementById('showData').onclick = () => {
    ready();
    console.log(idV + " " + nameV + " " + ageV + " " + yearV);
    db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().idNum);
            document.getElementById('name').value = doc.data().nameOfStudent;
            document.getElementById('idNum').value = doc.data().idNum;
            document.getElementById('age').value = doc.data().age;
            document.getElementById('year').value = doc.data().year;
        });
    }).catch((e) => {
        console.log("Error getting student by ID number: ", e.message);
    });

    db.collection('student').where("nameOfStudent", '==', nameV).get().then((snapshot) => {
        console.log("testing " + snapshot.get(0).id + " " + snapshot.get(0).data().nameOfStudent);
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().idNum);
            document.getElementById('name').value = doc.data().nameOfStudent;
            document.getElementById('idNum').value = doc.data().idNum;
            document.getElementById('age').value = doc.data().age;
            document.getElementById('year').value = doc.data().year;
        });
    }).catch((e) => {
        console.log("Error getting student by name: ", e.message);
    });
};

// UPDATE FUNCTIONALITY - ONCLICK

document.getElementById('update').onclick = () => {
    ready();
    console.log(idV + " " + nameV + " " + ageV + " " + yearV);
    db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // gets UID so we can locate the document to update it in collection
            const updateID = doc.id;

            // if any of these fields are empty, we then keep old value
            if (nameV == undefined) {
                nameV = doc.data().nameOfStudent;
            }
            if (ageV == undefined) {
                ageV = doc.data().age;
            }
            if (yearV == undefined) {
                yearV = doc.data().year;
            }

            // sets new value to this existing student record.  Update will only
            // change the values we ask it to change.  
            db.collection('student').doc(updateID).update({
                nameOfStudent: nameV,
                age: ageV,
                year: yearV
            }).then(() => {
                console.log("Updated, new data:");
            }).catch(e => console.log(e.message));
        });
    });
};

// DELETE FUNCTIONALITY - ONCLICK
document.getElementById('delete').onclick = () => {
    ready();
    db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // gets UID so we can locate the document to delete it in collection
            const updateID = doc.id;
            db.collection('student').doc(updateID).delete().then(() => {
                console.log("Deleted data");
            }).catch(e => console.log(e.message));
        });
    });
}