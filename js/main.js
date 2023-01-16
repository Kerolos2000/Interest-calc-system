let amount = document.querySelector("#exampleInputNumber1");
let interest = document.querySelector("#exampleInputNumber2");
let duration = document.querySelector("#exampleInputNumber3");
let date = document.querySelector("#exampleInputDate1");
let select = document.querySelector("#exampleInputSelect");
let search1 = document.querySelector("#exampleInputSearch1");
let search2 = document.querySelector("#exampleInputSearch2");
let search3 = document.querySelector("#exampleInputSearch3");
let sort1 = document.querySelector("#sort1");
let sort2 = document.querySelector("#sort2");
let sort3 = document.querySelector("#sort3");
let add = document.querySelector("#add");
let save = document.querySelector("#save");
let tbody = document.querySelector("#tbody");
let mainArr = [];
if (localStorage.getItem("myProduct") != null) {
  mainArr = JSON.parse(localStorage.getItem("myProduct"));
} else {
  mainArr = [];
}
let mainObj = {};

let thisDay = new Date();
let day = thisDay.getDate();
let month = thisDay.getMonth() + 1;
let year = thisDay.getFullYear();
if (day < 10) {
  day = `0${day}`;
}
if (month < 10) {
  month = `0${month}`;
}
let today = `${year}-${month}-${day}`;
date.value = today;

add.addEventListener("click", function () {
  if (
    amount.value != "" &&
    interest.value != "" &&
    duration.value != "" &&
    date.value != ""
  ) {
    createdata();
    clear();
  }
});

function createdata() {
  let tempNowInterest = 0;
  let thisDate = new Date(date.value);
  let day = thisDate.getDate();
  let month = thisDate.getMonth() + 1;
  let year = thisDate.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  let endDate = `${year + parseInt(duration.value)}-${month}-${day}`;

  let tempObjSelect = "";
  if (select.value == "true") {
    tempObjSelect = "متجددة";
  } else {
    tempObjSelect = "غير متجددة";
  }

  let tempEndInterest = (
    (amount.value * interest.value * duration.value) /
    100
  ).toFixed(2);
  let tempMonthInterest = ((amount.value * interest.value) / 100 / 12).toFixed(
    2
  );

  mainObj = {
    objAmount: amount.value,
    objInterest: interest.value,
    objDuration: duration.value,
    objDate: date.value,
    objEndDate: endDate,
    objSelect: tempObjSelect,
    objMonthInterest: tempMonthInterest,
    objEndInterest: tempEndInterest,
    objNowInterest: tempNowInterest,
    objdatanow: Date.now(),
  };
  mainArr.push(mainObj);
  show();
  local();
}

function show() {
  let x = "";
  for (let i = 0; i < mainArr.length; i++) {
    x += `
    <tr>
        <td>${i + 1}</td>
        <td>${mainArr[i].objAmount}</td>
        <td>${mainArr[i].objInterest}%</td>
        <td>${mainArr[i].objDate}</td>
        <td>${mainArr[i].objEndDate}</td>
        <td>${mainArr[i].objSelect}</td>
        <td>${mainArr[i].objMonthInterest}</td>
        <td>${mainArr[i].objEndInterest}</td>
        <td id=x${i}>${mainArr[i].objNowInterest}</td>
        <td onclick="Up(${i})"><button class="yellow">تحديث</button></td>
        <td onclick="Del(${i})"><button class="red">حدف</button></td>
    </tr>`;
  }
  tbody.innerHTML = x;
}
show();

function Up(i) {
  add.style.display = "none";
  save.style.display = "block";
  amount.value = mainArr[i].objAmount;
  interest.value = mainArr[i].objInterest;
  duration.value = mainArr[i].objDuration;
  date.value = mainArr[i].objDate;

  save.addEventListener("click", function () {
    if (
      amount.value != "" &&
      interest.value != "" &&
      duration.value != "" &&
      date.value != ""
    ) {
      showup(i);
      show();
      local();
      clear();
      add.style.display = "block";
      save.style.display = "none";
    }
  });
}
function showup(i) {
  let tempNowInterest = 0;
  let thisDate = new Date(date.value);
  let day = thisDate.getDate();
  let month = thisDate.getMonth() + 1;
  let year = thisDate.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  let endDate = `${year + parseInt(duration.value)}-${month}-${day}`;
  let tempObjSelect = "";
  if (select.value == "true") {
    tempObjSelect = "متجددة";
  } else {
    tempObjSelect = "غير متجددة";
  }
  let tempEndInterest = (
    (amount.value * interest.value * duration.value) /
    100
  ).toFixed(2);
  let tempMonthInterest = ((amount.value * interest.value) / 100 / 12).toFixed(
    2
  );
  mainArr[i].objAmount = amount.value;
  mainArr[i].objInterest = interest.value;
  mainArr[i].objDuration = duration.value;
  mainArr[i].objDate = date.value;
  mainArr[i].objEndDate = endDate;
  mainArr[i].objSelect = tempObjSelect;
  mainArr[i].objMonthInterest = tempMonthInterest;
  mainArr[i].objEndInterest = tempEndInterest;
  mainArr[i].objNowInterest = tempNowInterest;
}

function Del(i) {
  mainArr.splice(i, 1);
  show();
  local();
}

function local() {
  localStorage.setItem("myProduct", JSON.stringify(mainArr));
}

function clear() {
  amount.value = "";
  interest.value = "";
  duration.value = "";
}

function showSerch(el1, el2) {
  let x = "";
  let temp;
  for (let i = 0; i < mainArr.length; i++) {
    if (el2 === "objEndDate") {
      temp = mainArr[i].objEndDate;
    } else if (el2 === "objAmount") {
      temp = mainArr[i].objAmount;
    } else if (el2 === "objInterest") {
      temp = mainArr[i].objInterest;
    }
    if (temp.includes(el1)) {
      x += `
      <tr>
      <td>${i + 1}</td>
      <td>${mainArr[i].objAmount}</td>
      <td>${mainArr[i].objInterest}%</td>
      <td>${mainArr[i].objDate}</td>
      <td>${mainArr[i].objEndDate}</td>
      <td>${mainArr[i].objSelect}</td>
      <td>${mainArr[i].objMonthInterest}</td>
      <td>${mainArr[i].objEndInterest}</td>
      <td id=x${i}>${mainArr[i].objNowInterest}</td>
      <td onclick="Up(${i})"><button class="yellow">تحديث</button></td>
      <td onclick="Del(${i})"><button class="red">حدف</button></td>
      </tr>`;
    }
  }

  tbody.innerHTML = x;
}
search1.onchange = function () {
  showSerch(search1.value, "objEndDate");
};
search2.onkeyup = function () {
  showSerch(search2.value, "objAmount");
};
search3.onkeyup = function () {
  showSerch(search3.value, "objInterest");
};
sort1.onclick = function () {
  showSerch(today, "objEndDate");
};
sort2.onclick = function () {
  showSerch(`${year}-${month}`, "objEndDate");
};
sort3.onclick = function () {
  showSerch(`${year}`, "objEndDate");
};

setInterval(function () {
  for (let i = 0; i < mainArr.length; i++) {
    let xc = document.querySelector(`#x${i}`);
    xc.innerHTML = parseInt(
      Math.floor((Date.now() - mainArr[i].objdatanow) / 1000) *
        mainArr[i].objMonthInterest
    );
    mainArr[i].objNowInterest = parseInt(xc.innerHTML);
  }
  local();
}, 1000);
