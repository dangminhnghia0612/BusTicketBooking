// if (sessionStorage.getItem("isLoggedIn") === null) {
//   window.location.href = "./dang-nhap.html";
// }
document.addEventListener("DOMContentLoaded", function () {
  // Load sidebar
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    fetch("../../components/sidebar.html")
      .then((response) => response.text())
      .then((html) => {
        sidebarContainer.innerHTML = html;
        setActiveNavItem();
        initSidebarToggle();
      })
      .catch((error) => console.error("Error loading sidebar:", error));
  }

  // Load header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("../../components/header-admin.html")
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        // setPageTitle();
        initSidebarToggle();
        //Hiển thị tên admin
        document.getElementById("hoten").textContent =
          sessionStorage.getItem("hoten");
        //Đăng xuất
        const btnDangXuat = document.getElementById("btnDangXuat");
        btnDangXuat.addEventListener("click", function () {
          sessionStorage.removeItem("hoten");
          sessionStorage.removeItem("sdt");
          sessionStorage.removeItem("ma_quantrivien");
          sessionStorage.removeItem("isLoggedIn");
          window.location.href = "./dang-nhap.html";
        });
      })
      .catch((error) => console.error("Lỗi tải header:", error));
  }

  // Load footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    fetch("../../components/footer-admin.html")
      .then((response) => response.text())
      .then((html) => {
        footerContainer.innerHTML = html;
      })
      .catch((error) => console.error("Lỗi tải footer:", error));
  }
});

// Set active navigation item based on current page
function setActiveNavItem() {
  const currentPage =
    window.location.pathname.split("/").pop() || "bang-dieu-khien.html";

  // Remove all active classes first
  const navLinks = document.querySelectorAll(".sidebar .nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Set active class based on current page
  let activeNavId = "";

  if (currentPage === "bang-dieu-khien.html") {
    activeNavId = "nav-dashboard";
  } else if (currentPage === "quan-ly-nguoi-dung.html") {
    activeNavId = "nav-users";
  } else if (currentPage === "quan-ly-xe.html") {
    activeNavId = "nav-vehicles";
  } else if (currentPage === "quan-ly-tuyen-xe.html") {
    activeNavId = "nav-routes";
  } else if (currentPage === "quan-ly-chuyen-xe.html") {
    activeNavId = "nav-trips";
  } else if (currentPage === "quan-ly-dat-ve.html") {
    activeNavId = "nav-bookings";
  } else if (currentPage === "quan-ly-khuyen-mai.html") {
    activeNavId = "nav-promotions";
  } else if (currentPage === "quan-ly-tin-tuc.html") {
    activeNavId = "nav-content-news";
    document.getElementById("contentSubmenu").classList.add("show");
  } else if (currentPage === "quan-ly-bieu-ngu.html") {
    activeNavId = "nav-content-banners";
    document.getElementById("contentSubmenu").classList.add("show");
  } else if (currentPage === "quan-ly-thong-tin.html") {
    activeNavId = "nav-content-company";
    document.getElementById("contentSubmenu").classList.add("show");
  }
  const activeNavItem = document.getElementById(activeNavId);
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
}
// Initialize sidebar toggle functionality
function initSidebarToggle() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("show");
      }
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");

    if (
      window.innerWidth < 768 &&
      sidebar &&
      sidebar.classList.contains("show") &&
      !sidebar.contains(event.target) &&
      sidebarToggle &&
      !sidebarToggle.contains(event.target)
    ) {
      sidebar.classList.remove("show");
    }
  });

  // Handle checkbox "select all" functionality
  const checkAll = document.getElementById("checkAll");
  if (checkAll) {
    checkAll.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll("tbody .form-check-input");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = checkAll.checked;
      });
    });
  }
}
