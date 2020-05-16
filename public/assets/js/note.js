$(document).ready(function () {
    let newNote = {};
    // rendering notes on the left side
    function start() {
        $.ajax({
            url: "/api/notes",
            method: "GET"
        }).then((data) => {
            if (data.length > 0) {
                populateField(data);
            }
        });
    };
    start();
    // save note button
    $(".new-note").on("click", (event) => {
        event.preventDefault();
        console.log("save note button working");
        if (newNote.id === undefined) {
            newNote = {
                title: $(".note-title").val(),
                message: $(".note-textarea").val()
            };
        } else {
            newNote.title = $(".note-title").val();
            newNote.message = $(".note-textarea").val();
        }
        $.post("/api/notes", newNote)
            .then((data) => {
                console.log(data);
                console.log(typeof data);
                populateField(data);
                alert("Note Saved!");
                newNote = {
                    title: $(".note-title").val(),
                    message: $(".note-textarea").val()
                };
                console.log(JSON.stringify(newNote));
            });
    });
    // poputlate field function
    let populateField = (data) => {
        $(".list-group").empty();
        let a = 0;
        for (let i = 0; i < data.length; i++) {
            let eleHr = $("<hr>")
            let eleLi = $("<li>");
            eleLi.attr("id", a)
            eleLi.html(data[i].title + "<br>" + data[i].message);
            let eleButton = $("<button>");
            eleButton.html("delete");
            eleButton.attr("value", a);
            eleButton.attr("class", "btn btn-warning float-right");
            eleLi.append(eleButton);
            eleLi.append(eleHr);
            $(".list-group").prepend(eleLi);
            a++;
        };
    };
    // double click to edit saved notes
    $(document).on("dblclick", "li", function () {
        console.log("double click is working");
        let noteIndex = $(this).attr("id");
        $.ajax({
            url: "/api/notes",
            method: "GET"
        }).then((data) => {
            console.log(data[noteIndex]);
            $(".note-title").val(data[noteIndex].title);
            $(".note-textarea").val(data[noteIndex].message);
            newNote = {
                title: $(".note-title").val(),
                message: $(".note-textarea").val(),
                id: data[noteIndex].id
            };
            console.log(JSON.stringify(newNote));
        })
    });
    // deleteing the saved note
    $(document).on("click", "button", function () {
        console.log($(this).attr("value"));
        let noteIndex = $(this).attr("value");
        $.ajax({
            url: "/api/notes",
            method: "GET"
        }).then((data) => {
            $.ajax({
                url: "api/notes/" + data[noteIndex].id,
                method: "DELETE"
            })
                .then((data) => {
                    console.log(data);
                    console.log(typeof data);
                    populateField(data);
                    alert("Note Deleted!");
                    newNote = {
                        title: $(".note-title").val(),
                        message: $(".note-textarea").val()
                    };
                    console.log(JSON.stringify(newNote));
                });
        })
    })
});


// function check(newNote){
//     if (newNote.id === undefined) {
//         newNote = {
//             title: $(".note-title").val(),
//             message: $(".note-textarea").val()
//         };
//     }else{
//         newNote.title =  $(".note-title").val();
//         newNote.message =  $(".note-textarea").val();
//     }
// }

