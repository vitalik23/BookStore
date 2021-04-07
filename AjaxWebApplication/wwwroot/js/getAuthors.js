$(document).ready(function () {
    getAuthors();
});

var typeSort;
var sortBy;
var pageNumber;


function getAuthors() {
    var name = $("#filterByName").val();

    debugger;

    if (sortBy === undefined && sortBy === '') {
        sortBy = null;
        typeSort = null;
    }

    if (pageNumber === undefined || pageNumber < 1) {
        pageNumber = 1;
    }

    var filterAuthor = {
        AuthorFilterModels : {
            "Name": name,
            "SortBy": sortBy,
            "TypeSort": typeSort
        },
        PaginationFilterModels:{
            "pageNumber": pageNumber,
            "pageSize": 2
        }
    };

    $.ajax({
        url: "/Author/GetAuthors",
        type: "POST",
        data: filterAuthor,
        success: function (text) {
            if (text.length === 0) {
                debugger;
                pageNumber -= 1;
            }
            $('#id').html('');
            $('#name').html('');
            $('#products').html('');

            text.data.forEach((book) => {
                $('#id').append(book.id + "</br>");
                $('#name').append(book.name + "</br>");
                book.authorInPrintingEdition.forEach((printingEdition) => {
                    $('#products').append(printingEdition.printingEdition.title + "</br>");
                });
            });
        },
        error: function (responce) {
            alert("error");
        }
    });
}

function sorting(sortByField) {
    sortBy = sortByField;
    typeSort = typeSort == "Desc" ? "Asc" : "Desc";
    getAuthors();
}

function prevPage(number) {
    pageNumber -= number;
    getAuthors();
}

function nextPage(number) {
    pageNumber += number;
    getAuthors();
}