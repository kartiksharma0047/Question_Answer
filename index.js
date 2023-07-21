let questions = [
    {
        question: "2+2",
        answer: 4,
        options: [2, 4, 6, 8]
    },
    {
        question: "2+2+2",
        answer: 6,
        options: [1, 4, 6, 7]
    },
    {
        question: "2+2+2+2",
        answer: 8,
        options: [2, 5, 6, 8]
    },
    {
        question: "2+2+2+2+2",
        answer: 10,
        options: [10, 4, 6, 8]
    },
];

let btn1 = document.querySelector("#btn1");
let box = document.querySelector("#box");
btn1.onclick = () => {
    btn1.classList.add("display-hide");
    box.classList.remove("display-hide");
    Overall();
}
function Overall() {

    let que = document.querySelector(".question");
    let btn = document.querySelectorAll(".btn");
    let tik = document.querySelector("#timer");
    let x = 0, y = 5, z = 0, i, j = 0;
    tik.innerHTML=y;
    let ans = [];
    let clock = setInterval(() => {
        if (y == 0) {
            y = 5;
            z++;
            if (z == 4) {
                clearInterval(clock);
            }
        }
        tik.innerHTML = y;
        y--;
    }, 950);
    function showQuestion(index) {
        StoreUserAnswers();
        que.innerHTML = questions[index].question;
        btn.forEach((btn, i) => {
            btn.innerHTML = questions[index].options[i];
            btn.value = questions[index].options[i];
        });
    }
    showQuestion(x);

    let end = setInterval(function FirstTime() {
        if (x == questions.length - 1) {
            NormalBtn();
            StoreUserAnswers();
            clearInterval(end);
            btn.forEach((value) => {
                value.setAttribute("disabled", "");
                value.classList.remove("btn");
                value.classList.add("btn-temp");
            })
            CheckUserAnswer();
        }
        else {
            NormalBtn();
            StoreUserAnswers();
            x++;
            que.innerHTML = questions[x].question;
            btn.forEach((l, index) => {
                l.innerHTML = questions[x].options[index];
                l.value = questions[x].options[index];
            })
        }
    }, 5000)
    function ChangeBtn(i) {
        btn.forEach((bt) => {
            bt.setAttribute("disabled", "");
            bt.classList.remove("btn");
            bt.classList.add("btn-temp");
        })
        btn[i].classList.add("btn-click")
    }
    function NormalBtn() {
        btn.forEach((bt1) => {
            bt1.removeAttribute("disabled", "");
            bt1.classList.remove("btn-temp");
            bt1.classList.add("btn");
            bt1.classList.remove("btn-click");
        })
    }
    function StoreUserAnswers() {
        for (let i = 0; i < 4; i++) {
            btn[i].onclick = (event) => {
                ChangeBtn(i);
                ans.push(event.target.value); // Capture the value of the selected button and push it to the array
                console.log(ans);
                btn.forEach((btn) => {
                    btn.onclick = null; // Remove the event listener to prevent multiple answers from being stored
                });
            };
        }
    }
    function CheckUserAnswer() {
        let score = 0;
        ans.forEach((answer, index) => {
            if (Number(answer) == questions[index].answer) {
                score++;
            }
        });
        let heading1 = document.querySelector("h1");
        let fontIcons = document.querySelectorAll(".fa-solid.fa-circle");
        heading1.classList.remove("display-hide");

        let toggleCount = 4;
        let k = 0;
        j = 0;
        let load = setInterval(() => {
            if (j == 4) {
                j = 0;
                k++;
                if (k === toggleCount) {
                    heading1.classList.add("display-hide");
                    fontIcons[0].classList.toggle("display-hide");
                    clearInterval(load);
                    RevelAnswer(score);
                }
            }
            fontIcons[j].classList.toggle("display-hide");
            j++;
        }, 500);
    }
    function RevelAnswer(score) {
        let revel = document.querySelector("h2");
        revel.classList.remove("display-hide");
        revel.innerHTML = "Correct Guesses Are " + score + " Out Of 4 Questions";
    }
}