//DATA
const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./assets/img/unsplash_279xIHymPYY.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./assets/img/unsplash_IF9TK5Uy-KI.png",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./assets/img/unsplash_MLJHxQ5qxxY.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./assets/img/unsplash_MLJHxQ5qxxY.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];
const date = ["2022-03-04", "2022-03-05", "2022-03-06"];
const time = [
  {
    id: 1,
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    id: 2,
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    id: 3,
    start_time: "10:00",
    end_time: "10:30",
  },
];
let result = JSON.parse(localStorage.getItem("result")) || {};
let servicesContent = document.querySelector(".services");
let staffContent = document.querySelector(".staff");
let staffLink = document.querySelector(".staff-link");
let serviceLink = document.querySelector(".service-link");
let dateTimeLink = document.querySelector(".date-time-link");
let confirmLink = document.querySelector(".confirm-link");
let dateContent = document.querySelector(".date");
let monthYear = document.querySelector("#month-year");
let daysGrid = document.querySelector("#days-grid");
let notificationMessage = document.querySelector(".notification-message");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let modal = document.getElementById("myModal");
let closeModalBtn = document.querySelector(".close");
let nextLink = document.querySelector(".next");
let notification = document.querySelector("#notification");
let inputs = document.querySelectorAll("input");
let noteContent = document.querySelector(".note-content");
// SERVICES
const drawserviceContent = () => {
  servicesContent.innerHTML = "";
  services.forEach((service) => {
    servicesContent.innerHTML += `
    
        <div class="card" onclick=selectService(${service.id})>
        <img src=${service.image} alt="">
        <div class="card-content">
          <div class="service">
           <p> ${service.name}</p>
           <p class="duration">${service.duration}</p>
          </div>
          <div class="price"><p>$${service.price} </p></div>
        </div>
      </div>
    
    `;
  });
};
drawserviceContent();

const selectService = (serviceId) => {
  result.service_id = serviceId;
  localStorage.setItem("result", JSON.stringify(result));
  window.location = "date-time.html";
};

// STAFF
const drawStaffContent = () => {
  staffContent.innerHTML = "";
  staff.forEach((person) => {
    staffContent.innerHTML += `
          <div class="card staff-card" onclick=selectStaffCard(${person.id})>
            <img src=${person.image} alt="" />
            <div class="person-info">
              <p class="person-name">${person.name}</p>
              <p class="person-email">${person.email}</p>
            </div>
          </div> 
          `;
  });
};
drawStaffContent();

const selectStaffCard = async (staffId) => {
  result.staff_id = staffId;
  localStorage.setItem("result", JSON.stringify(result));
  window.location = "service.html";
};

// DATE & TIME

const drawDateContent = () => {
  dateContent.innerHTML = "";
  time.forEach((item) => {
    dateContent.innerHTML += `
<div class="date-duration" onclick=getTime(${item.id})>
<p>${item.start_time}</p>
<p>${item.end_time}</p>
</div>
`;
  });
};

const getTime = (timeId) => {
  let findTime = time.find((item) => item.id == timeId);
  result.time = `${findTime.start_time}-${findTime.end_time}`;
  localStorage.setItem("result", JSON.stringify(result));
  window.location = "confirmation.html";
};
// CALENDAR
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendar() {
  monthYear.textContent = `${months[currentMonth]}${currentYear}`;
  daysGrid.innerHTML = "";
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysNum = lastDay.getDate();

  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day-cell", "empty");
    daysGrid.appendChild(emptyCell);
  }
  const dateDays = date.map((item) => parseInt(item.split("-")[2]));
  for (let day = 1; day <= daysNum; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    // console.log(day);
    dayCell.classList.add("day-cell");

    if (dateDays.includes(day)) {
      dayCell.classList.add("active");
    } else {
      dayCell.classList.add("inactive");
    }
    daysGrid.appendChild(dayCell);
  }
}
prevBtn.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  getCalendar();
});

nextBtn.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  getCalendar();
});
getCalendar();

// Available days

let dayCells = document.querySelectorAll(".day-cell");
dayCells.forEach((dayCell) => {
  dayCell.addEventListener("click", () => {
    drawDateContent();
    const day = dayCell.textContent;
    const selectedDate = new Date(currentYear, currentMonth, day);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();
    const formattedSelectedDate = `${selectedYear}-${selectedMonth
      .toString()
      .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    result.date = formattedSelectedDate;
    localStorage.setItem("result", JSON.stringify(result));
  });
});

// LEFT BAR LINKS
const links = document.querySelectorAll(".booking-panel .left-bar a");
const currentPage = window.location.pathname.split("/").pop();
const linksArray = Array.from(links);
const checkedLinkNum = document.querySelectorAll(".number .num");
const checkedLinkNumArr = Array.from(checkedLinkNum);
const index = linksArray.findIndex((link) => {
  const linkPath = link.getAttribute("href").split("/").pop();
  return linkPath === currentPage;
});

const checkLinks = () => {
  const linksAfterLinks = linksArray.slice(index + 1);
  linksAfterLinks.map((link) => {
    link.style.pointerEvents = "none";
    link.style.cursor = "no-drop";
  });

  const linksBeforeLinks = linksArray.slice(0, index);
  const numafternum = checkedLinkNumArr.slice(0, index);
  numafternum.map((num) => {
    num.innerHTML = "";
    num.innerHTML = `
    <img src="./assets/img/check-icon.png" alt="" class="check-img">
    
    `;
    num.classList.add("check-num");
  });

  linksBeforeLinks.map((link) => {
    link.style.pointerEvents = "auto";
    link.style.cursor = "pointer";
  });
};

checkLinks();

//  CONFIRMATION

const selectedStaff = staff.find((person) => person.id === result.staff_id);
const selectedService = services.find(
  (service) => service.id === result.service_id
);
const drawCustomerInfo = () => {
  noteContent.innerHTML = "";

  // console.log(selectedStaff);
  noteContent.innerHTML = `
    <div class="note-group">
      <p><span>Staff:</span>${selectedStaff?.name}</p>
    </div>
    <div class="note-group">
      <p><span>Service:</span>${selectedService?.name}</p>
    </div>
    <div class="note-group">
      <p> <span>Date:</span> ${result?.date}/${result?.time}</p>
    </div>
    <div class="note-group">
      <p class="price"> <span>Staff: </span>${selectedService?.price}$</p>
    </div>
  `;
};
drawCustomerInfo();

// NEXT LINK CLICK

const colorLinks = () => {
  checkedLinkNumArr[index].classList.add("current-num");
  linksArray[index].style.color = "#53d56c";
};
colorLinks();

nextLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (window.location.pathname.includes("staff.html")) {
    result.staff_id
      ? (window.location = "service.html")
      : drawNotification("Select staff");
  } else if (window.location.pathname.includes("service.html")) {
    result.service_id
      ? (window.location = "date-time.html")
      : drawNotification("Select Service");
  } else if (window.location.pathname.includes("date-time.html")) {
    result.date && result.time
      ? (window.location = "confirmation.html")
      : drawNotification("Select date & time");
  } else if (window.location.pathname.includes("confirmation.html")) {
    if (
      inputs[0].value &&
      inputs[1].value &&
      inputs[2].value &&
      inputs[3].value
    ) {
      let customer = {
        name: inputs[0].value,
        surname: inputs[1].value,
        email: inputs[2].value,
        phone: inputs[3].value,
      };
      result.customer = customer;
      localStorage.setItem("result", JSON.stringify(result));
      console.log(result);
      inputs.forEach((input) => (input.value = ""));
      drawModalContent("Confirmation successfuly completed!", "green");
    } else {
      drawModalContent("Please, fill the all required fields!", "orange");
    }
  }
});

// NOTIFICATION
const modalText = document.querySelector(".modal-text p");
const drawNotification = (content) => {
  notification.style.display = "block";
  notificationMessage.innerHTML = content;
  notification.style.transition = "opacity 0.5s";
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    notification.style.opacity = "0";
  }, 1500);
  setTimeout(() => {
    notification.style.display = "none";
    notification.style.opacity = "1";
    notification.style.transition = "";
  }, 2000);
};

// MODAL
const drawModalContent = (content, color) => {
  modal.style.display = "block";
  modalText.innerHTML = content;
  modalText.style.color = color;
};

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  window.location = "staff.html";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    window.location = "staff.html";
  }
});
