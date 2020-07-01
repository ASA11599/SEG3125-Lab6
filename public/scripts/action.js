// taken from https://github.com/carolinebarriere/carolinebarriere.github.io/blob/master/SEG3125-Module6-SurveyAnalysis/public/assets/action.js

function getAnswer(q) {
    switch (q) {
        case 1:
            return document.getElementById("q1ans")["value"];
        case 2:
            let res2 = "None";
            const answers2 = document.querySelectorAll(".q2ans");
            for (ans of answers2) {
                if (ans["checked"]) {
                    res2 = ans["value"];
                    break;
                }
            }
            return res2;
        case 3:
            const res3 = [];
            const answers3 = document.querySelectorAll(".q3ans");
            for (ans of answers3) {
                if (ans["checked"]) {
                    res3.push(parseInt(ans["value"]));
                }
            }
            return res3;
        case 4:
            return document.getElementById("q4ans")["value"];
        case 5:
            return parseInt(document.getElementById("q5ans")["value"]);
        case 6:
            return document.getElementById("q6ans")["value"];
        default:
            return undefined;
    }
}

function getFormData() {
    res = [
        {
            question: "What is the problem with language selection on picture 3 and how can it be improved ?",
            answer: getAnswer(1)
        },
        {
            question: "Which of the following goals does this UI fulfill best ?",
            answer: getAnswer(2)
        },
        {
            question: "Which of the three pages are consistent with each other ?",
            answer: getAnswer(3)
        },
        {
            question: "Which of the following goals does this UI perform the worst at ?",
            answer: getAnswer(4)
        },
        {
            question: "The main page clearly communicates what the website is about",
            answer: getAnswer(5)
        },
        {
            question: "Commments",
            answer: getAnswer(6)
        }
    ];
    console.log(res);
    return JSON.stringify(res);
}

$(document).ready( function () {
    $('#submitButton').on('click', function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/',
            dataType: "json",
            data: getFormData(),
            success: function(data) {
                // do something with the data via front-end framework
                // Make the submit button red, disabled and saying Thank you
                $("#submitButton").prop("disabled", true);
                $("#submitButton > h3").prop("innerText", "Thank You!");
            }
        });
        return false;
    });
  });
