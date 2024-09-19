/** Phần 01 */
/** ------------------ Closure ---------------*/
// VD1
const f1 = () => {
  let n = 1;
  return (f2 = () => {
    return n++;
  });
};
let result = f1();
console.log("vd1:", result());
console.log("vd1:", result());
console.log("vd1:", result());

//VD2
const handlePrice = () => {
  let price = 4000;
  return {
    getPrice: () => {
      return price;
    },
    setPrice: (newPrice) => {
      return (price += newPrice);
    },
  };
};

let cour = handlePrice();
console.log(cour.getPrice());
cour.setPrice(500);
console.log(cour.getPrice());

/** ------------------ Curring ---------------*/
// VD1
const sumCurring = (a, b, c) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};
const sumResult1 = sumCurring(1);
const sumResult2 = sumResult1(2);
const sumResult3 = sumResult2(3);
console.log(sumResult3);

// VD2: Giảm giá 10% trên tổng hóa đơn cho tất cả các khách hàng thân thiết
const discountCurring = (discount) => {
  return (price) => {
    return (price -= price * discount);
  };
};
const tenPercentDiscount = discountCurring(0.1);
const sixtyPercentDiscount = discountCurring(0.6);
console.log(tenPercentDiscount(1000));
console.log(sixtyPercentDiscount(1000));

/** --------------- Optional Chaining (?.) -------------*/
//VD1
const member = {
  name: "Quang Trung",
  cat: {
    name: "student",
  },
};
// console.log(member.color.price);
// Toán tử 3 ngôi
let m = member.color ? member.color.name : undefined;
console.log("vd1: ", m);
// Toán tử Optinal Chaining
let m1 = member?.color?.name;
console.log("vd1: ", m1);

//VD2: Sử dụng với Object, Array, Function?.
// Object
const obj = { a: 1 };
console.log(obj?.a);
console.log(obj?.c?.d);
console.log(obj?.a?.g?.h);
// Array
const arr = [3, 4];
console.log(arr?.[0]);
console.log(arr?.[3]);
// Function
const userAdmin = {
  admin() {
    console.log("I am Student");
  },
};
const userGuest = {};
userAdmin?.admin?.();
userGuest?.admin?.();

/** ---------- Toàn tử Nullish Coalescing ---------*/
// vd1
const foo = null ?? "default string";
console.log(foo);
const baz = 0 ?? 42;
console.log(baz);

//vd2 kết hợp toán tử Nullish Coalescing với Optinal Chaining
let customer = {
  name: "Quang Trung",
  details: {
    age: 26,
  },
};
const customerCourse = customer?.details?.age ?? "City not provided";
console.log(customerCourse);

/** ---------- Shallow copying (Copy cạn) ---------*/
//vd1: Object.assign method - object.assign trong js
// Cách 01
const objShallow = {
  a: {
    a1: 1,
    a2: 2,
  },
};
let objShallowCopy = Object.assign({}, objShallow);
objShallowCopy.a.a1 = 4;
console.log(objShallow.a.a1);
console.log(objShallowCopy.a.a1);

// Cách 02: Toán tử phân rã: Spread Operator ES6
const objShallow2 = {
  a: {
    a1: 1,
    a2: 2,
  },
};
let objShallowCopy2 = { ...objShallow2 };
objShallowCopy2.a.a1 = 6;
console.log(objShallow2.a.a1);
console.log(objShallowCopy2.a.a1);

/** ---------- Deep copying (Copy sâu) ---------*/
// VD1
const objDeepCopy = {
  a: {
    a1: 1,
    a2: 2,
  },
};
let objDeepCopy2 = JSON.parse(JSON.stringify(objDeepCopy));
objDeepCopy2.a.a1 = 8;
console.log(objDeepCopy.a.a1);
console.log(objDeepCopy2.a.a1);

/** Phần 02 */
/** ---------- Asynchronous & Synchronous ---------*/
/** ---- Callback ---*/
const asyncFuncttion = (callback) => {
  console.log("start");
  setTimeout(() => {
    callback();
  }, 1000);
  console.log("Watting");
};
let printEnd = () => {
  console.log("End");
};
asyncFuncttion(printEnd);

/** ---- Callback Hell ---*/
const getData = (link, callback) => {
  setTimeout(() => {
    callback();
  }, 1000);
};
getData("Data1", () => {
  getData("Data2", () => {
    getData("Data2", () => {
      getData("Data3", () => {
        getData("Data4", () => {
          getData("Data5", () => {
            console.log("Done");
          });
        });
      });
    });
  });
});

/** ---- Promise ---*/
// vd1
const fetchApi = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: "1234",
      gender: "male",
    });
  }, 2000);
});
fetchApi
  .then((res) => {
    console.log(res);
    return 1;
  })
  .then((res) => {
    console.log(res);
    return 2;
  })
  .then((res) => {
    console.log(res);
    return 3;
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// vd1: Dùng đối tượng Promise & Axios để lấy dữ liệu thông qua API
const getJSONPro = () => {
  return new Promise((resolve, reject) => {
    const courses = axios.get("");
    courses
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
getJSONPro();

/** ---- Async/ Await ---*/
// Cách 1: Dùng Promise
const getJSON = () => {
  return new Promise((resolve, reject) => {
    const course = axios.get("");
    course
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
getJSON();
// Cách 2: Dùng Async/ Await xử lý lỗi với try/ catch
// async getJSONAsync =()=>{
//   try{
//     const course = await.axios.get("");
//     return course;
//   }catch(error){
//     console.log(error);
//   }
// }
// getJSONAsync().then((res)=>{
//   console.log(res);
// })
// // Cách 3: Dùng Async/ Await xử lý lỗi với catch()
// async getJSONAsync1 = ()=>{
//   const course = await.axios.get("");
//   return course;
// }
// getJSONAsync1().then((res)=>{
//   console.log(res);
// }).catch(error){
//   console.log(error);
// }

/** --------------- Tìm hiểu về API ----------------*/
/** --- JSON DATA ---*/
// {
//   "widget":{
//     "debug":"on",
//     "window":{
//       "title":"Nguyen Van A",
//       "name":"VanA",
//       "width": 500,
//       "height": 500
//     },
//     "img":{
//       "src":"img/sun.jpg",
//       "name": "sun1",
//       "price": 3500
//     }
//   }
// }

/**
 * 1, handle Nav Menu
 * 2, popup video
 * 3, progress bar
 * 4, back to top
 * 5, scroll change bg header
 * 6, Slider User Say
 * 7, Loading Page
 * 8, Validate form blog page
 * 9, Tabs Posts
 * 10, Validate form contact page
 * 11, Accordion
 *
 */

//* 1,handle Nav Menu
const handleNavMenu = () => {
  const btnMenu = document.querySelector(".btnmenu");
  const btnMenuItem = document.querySelector(".btnmenu .btnmenu__item");
  const navMenu = document.querySelector(".nav");
  btnMenu.addEventListener("click", () => {
    navMenu.classList.toggle("--active");
    btnMenuItem.classList.toggle("--active");
  });

  const removeNavMenu = () => {
    navMenu.classList.remove("--active");
    btnMenuItem.classList.remove("--active");
  };

  window.addEventListener("resize", () => {
    let wWindow = window.innerWidth;
    if (wWindow > 992) removeNavMenu();
  });
};

//* 2,popup video
const handlePopupVideo = () => {
  const popupVideo = document.querySelector(".popupvideo");
  const video = document.querySelector(".scgetstart__video");
  const btnClose = document.querySelector(".close");
  const iframe = document.querySelector(".popupvideo__inner-iframe iframe");

  if (video) {
    video.addEventListener("click", () => {
      popupVideo.classList.add("--active");

      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/T7zw2ZPotj0?si=tV6834XCAOMKi6jX?ref=0&amp;autoplay=1&amp`
      );
    });
    const removePopup = () => {
      popupVideo.classList.remove("--active");
      iframe.setAttribute("src", "");
    };

    btnClose.addEventListener("click", removePopup);
  }
};

//* 3, progress bar
const handleProgressBar = () => {
  const progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let persent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${persent}%`;
  });
};

//* 4, back to top
const handleBackToTop = () => {
  const btn = document.querySelector(".footer__bottom-backtotop");
  if (window.scrollY > (document.body.offsetHeight - window.innerHeight) / 2) {
    btn.classList.add("--active");
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } else {
    btn.classList.remove("--active");
  }
};

//* 5, scroll change bg header
const handleChangeBgHeader = () => {
  const header = document.querySelector("header");
  const heightHeader = document.querySelector("header").offsetHeight;

  if (window.scrollY > heightHeader) {
    header.classList.add("--active");
  } else {
    header.classList.remove("--active");
  }
};

//* 6, Slider User Say
const handleSliderUserSay = () => {
  var slider = document.querySelector(".scusersay__box");
  if (slider) {
    // console.log({ slider });
    var flktySlider = new FlickityResponsive(slider, {
      // options

      contain: true,
      draggable: ">1",
      freeScroll: false,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      groupCells: 2,
      cellAlign: "center",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            cellAlign: "center",
            groupCells: 1,
          },
        },
      ],
    });
  }
};

//* 7, Loading Page
const initLoading = () => {
  let loadedCount = 0;
  let imgs = document.querySelectorAll("img").length;
  const container = document.querySelector("body");

  let imgLoad = imagesLoaded(container);
  imgLoad.on("progress", (instance) => {
    loadedCount++;
    let percent = Math.floor((loadedCount / imgs) * 100);
    handleLoading(percent);
    // console.log("object");
  });
  imgLoad.on("always", (instance) => {
    // console.log("always");
  });
  imgLoad.on("fail", (instance) => {
    // console.log(instance);
  });
  imgLoad.on("done", (instance) => {
    // console.log("done");
    hiddenLoading();
  });
};

const handleLoading = (percent) => {
  const progress = document.querySelector(".loading__inner-progress");
  const textPercent = document.querySelector(".loading__percent");

  progress.style.width = `${percent}%`;
  textPercent.innerHTML = `${percent}%`;
};

const hiddenLoading = () => {
  const loading = document.querySelector(".loading");
  const body = document.querySelector("body");
  // console.log("body nè", body);
  loading.classList.add("--is-loaded");
  body.classList.remove("--disable-scroll");
};

//* 8, Validate form blog page
const validateFormBlogPage = () => {
  const form = document.querySelector(".scsubcribe__right");
  const email = document.querySelector("#email");

  // handle error
  const handleError = (input, texterr = "") => {
    let err = document.querySelector(".scsubcribe__right .error");
    // console.log("object", err);
    if (texterr != "") {
      err.innerText = texterr;
      input.classList.add("inputerror");
    } else {
      err.innerText = texterr;
      input.classList.remove("inputerror");
    }
  };

  // isEmail
  const isEmail = (value) => {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(value);
  };

  // check input
  const checkInput = () => {
    //email
    const valueEmail = email.value.trim();
    let error = document.querySelector(".scsubcribe__right .error");
    if (valueEmail == "") {
      handleError(email, "Input value is null. Please, check again!");
      email.classList.add("inputerror");
    } else if (!isEmail(valueEmail)) {
      handleError(email, "Invalid email!");
    } else {
      handleError(email);
    }
  };

  // submit form
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInput();
  });
};

// * 9, Tabs Posts
const handleTabsPosts = () => {
  let tabs = document.querySelectorAll(".tabs .tabs__item");
  let postList = document.querySelectorAll(".scposts__list");
  // console.log(postList);
  tabs.forEach((item) => {
    item.addEventListener("click", () => {
      // delete all tabs have --active
      tabs.forEach((item) => {
        item.classList.remove("--active");
      });

      //before add class --active in tabs when click
      item.classList.add("--active");

      postList.forEach((item) => {
        item.classList.remove("active");
      });

      let id = item.dataset.tab;
      // console.log("qqq", id);
      document.querySelector(".scposts__list-" + id).classList.add("active");
    });
  });
};

// * 10, Validate form contact page
const validateFormContactPage = () => {
  const formContact = document.querySelector(".contact__form-input");
  const fullname = document.querySelector("#fullname");
  const email = document.querySelector("#email");
  const company = document.querySelector("#company");
  const subject = document.querySelector("#subject");
  const message = document.querySelector("#message");

  // handle error
  const handleError = (input, texterr = "") => {
    let error = input.parentElement.querySelector(
      ".formgroup__row-input .error"
    );

    // console.log("object", error);
    if (texterr != "") {
      //báo lỗi
      error.innerText = texterr;
      input.classList.add("inputerror");
    } else {
      // xóa lỗi
      error.innerText = texterr;
      input.classList.remove("inputerror");
    }
  };

  // isEmail
  const isEmail = (value) => {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(value);
  };

  const checkInput = () => {
    let dataArr = [];
    // fullname
    const valueFullname = fullname.value.trim();
    if (valueFullname == "") {
      //báo lỗi
      handleError(fullname, "Input value is null. Please, check again!");
      return false;
    } else {
      dataArr.push(valueFullname);
      handleError(fullname);
    }

    // email
    const valueEmail = email.value.trim();
    if (valueEmail == "") {
      //báo lỗi
      handleError(email, "Input value is null. Please, check again!");
      return false;
    } else if (!isEmail(valueEmail)) {
      handleError(email, "Invalid email!");
      return false;
    } else {
      dataArr.push(valueEmail);
      handleError(email);
    }

    // company
    const valueCompany = company.value.trim();
    if (valueCompany == "") {
      //báo lỗi
      handleError(company, "Input value is null. Please, check again!");
      return false;
    } else {
      dataArr.push(valueCompany);
      handleError(company);
    }

    // subject
    const valueSubject = subject.value.trim();
    if (valueSubject == "") {
      //báo lỗi
      handleError(subject, "Input value is null. Please, check again!");
      return false;
    } else {
      dataArr.push(valueSubject);
      handleError(subject);
    }

    // message
    const valueMessage = message.value.trim();
    if (valueMessage == "") {
      //báo lỗi
      handleError(message, "Input value is null. Please, check again!");
      return false;
    } else {
      dataArr.push(valueMessage);
      handleError(message);
    }

    return dataArr;
  };

  formContact?.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = checkInput();
    if (result != false) {
      //call API
      // console.log(result);
    } else {
      // console.log("err");
    }
  });
};

// * 11, Accordion
const handleAccordion = () => {
  const accordion = document.querySelectorAll(".scfaq__list-item .title");
  accordion.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("--active");
      const desc = item.nextElementSibling;
      // console.log("descc", desc);
      desc.classList.toggle("--slide");
    });
  });
};

window.addEventListener("load", () => {
  handleNavMenu();
  handlePopupVideo();
  handleProgressBar();
  handleBackToTop();
  handleChangeBgHeader();
  handleSliderUserSay();
  initLoading();
  validateFormBlogPage();
  validateFormContactPage();
  handleTabsPosts();
  handleAccordion();
});

window.addEventListener("resize", () => {
  handleSliderUserSay();
});
window.addEventListener("scroll", () => {
  handleBackToTop();
  handleChangeBgHeader();
});
