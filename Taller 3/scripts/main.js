import { dataCourses } from './dataCourses.js';
import { infoStudent } from './infoStudent.js';
var coursesTbody = document.getElementById('courses');
var estudianteTbody = document.getElementById('estudiante');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredit");
var inputSearchBox = document.getElementById("search-box");
var maxbox = document.getElementById("maximo-creditos");
var minbox = document.getElementById("minimo-creditos");
var totalCreditElm = document.getElementById("total-credits");
renderCoursesInTable(dataCourses);
renderStudentInTable(infoStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredit(); };
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(estudiante) {
    console.log('Desplegando datos de estudiante');
    estudiante.forEach(function (dato) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + dato.col1 + "</td>\n                           <td>" + dato.col2 + "</td>";
        estudianteTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    var numMin = parseInt(minbox.value);
    var numMax = parseInt(maxbox.value);
    clearCoursesInTable();
    if (numMax == null || numMin == null) {
    }
    else {
        var val = searchCourseByCredit(numMax, numMin, dataCourses);
        renderCoursesInTable(val);
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredit(max, min, courses) {
    return courses.filter(function (c) { return (c.credits >= min && c.credits <= max); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
