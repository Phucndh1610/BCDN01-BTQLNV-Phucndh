//Biến toàn cục (global)
//Tạo thể hiện của lớp DanhSachSinhVien
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

//Hàm rút gọn cú pháp của document.getElementById
function getELE(id) {
    // id: kiểu string
    return document.getElementById(id);
}

//localStorage: nơi lưu trữ dữ liệu (data) ở trong trình duyệt web của laptop
//Lưu mảng SV xuống localStorage
function setLocalStorage() {
    //localStorage: biến đối tượng có sẵn của js
    //localStorage chỉ lưu kiểu dữ liệu Json
    //chuyển dssv.mangSV từ kiểu mảng sang kiểu Json
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}
//Lấy data từ LocalStorage
function getLocalStorage() {
    //getItem sẽ lấy dữ liệu lên là Json
    //parse chuyển từ Json về kiểu mảng
    //Kiểm tra có dữ liệu localStorage hay không
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();


// hiển thị bảng

function hienThiTable(mang) {
    //content sẽ chứa nhiều thẻ tr => mỗi thẻ tr là 1 sv
    var content = "";
    //duyệt mảng để lấy thông tin từng sv trong mảng
    //map: hàm callback function
    //item: 1 phần tử trong mảng
    //index: vị trí của phần tử trong mảng
    mang.map(function (item, index) {
        //item đại diện cho 1 sv
        //content = content + thẻ tr
        //template literal / string template => ES6
        content += `<tr>
            <td>${item.taiKhoan}</td>
            <td>${item.tenNV}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.luongTB}</td>
            <td>${item.xepLoai}</td> 
            <td>
                <button class="btn btn-danger" data-toggle="modal" data-target="#myModal1" onclick="xoaNV('${item.taiKhoan}')">Xóa</button>
            </td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${item.taiKhoan}')" >Xem</button>
            </td>
        </tr>` ;
    });
    getELE("tableDanhSach").innerHTML = content;
}
// lấy dữ liệu
function layDuLieu() {
    var taiKhoan = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    // validation
    var isValid = true;
    if (getELE("tknv").disabled != true) {
        isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài Khoản không được để trống!") && validation.checkID(taiKhoan, "tbTKNV", "Tài Khoản bị trùng!", dsnv.mangNV);
    }

    //Kiểm tra tên   
    isValid &= validation.checkEmpty(tenNV, "tbTen", "Tên NV không được để trống!") && validation.checkName(tenNV, "tbTen", "Tên NV phải là ký tự chữ");

    //Kiểm tra email   
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //Kiểm tra pass  
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!") && validation.checkPass(matKhau, "tbMatKhau", "Mật khẩu chưa đúng định dạng");

    //Kiểm tra lương 
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống!") && validation.checkLuong(luongCB, "tbLuongCB", "Tiền lương chưa hợp lệ");

    //Kiểm tra chức vụ
    isValid &= validation.checkDropdown("chucvu", "tbChucVu", "Bạn chưa chọn chức vụ nào!");

    // kiểm tra giờ làm 
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không bỏ trống!") && validation.checkTime(gioLam, "tbGiolam", "Giờ làm 1 tháng chỉ từ 80-200h");

    // kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không bỏ trống!") && validation.checkDate(ngayLam, "tbNgay", "Không đúng định dạng ngày");

    if (isValid) {
        var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, Number(luongCB), chucVu, Number(gioLam));
        nv.luongTB = nv.tinhLuong();
        nv.xepLoai = nv.xepLoai();
        return nv;
    } else {
        return 0;
    }
}

// thêm nhân viên
function themNV() {
    var nv = layDuLieu();
    if (nv != 0) {
        dsnv.themNhanVien(nv);
        // lưu xuống local
        setLocalStorage();
        // B4: hiển thị lên table
        hienThiTable(dsnv.mangNV);
    }
}


/**
 * Xoa SV
 * - Tìm vị trí(index) trong mảng
 * - Dựa vào maNV để tìm được vị trí
 * - Xóa sv ra khỏi mảng dựa vào vị trí 
 */

function xoaNV(taikhoan) {
    dsnv.xoaNhanVien(taikhoan);

    hienThiTable(dsnv.mangNV);
    setLocalStorage();
}




/**
 * - hiển thị chi tiết của sv
 * - tìm vị trí để lấy sv và hien thị lên form
 * - Lấy thông tin mới từ form
 * - lưu tạm thông tin trong đối tượng sv mới
 * - cập nhật sv mới xuống vị trí của sv cần update
 */

function xemChiTiet(taiKhoan) {
    var viTri = dsnv.timViTri(taiKhoan);
    var nv = dsnv.mangNV[viTri];
    getELE("tknv").disabled = true;

    getELE("tknv").value = nv.taiKhoan;
    getELE("name").value = nv.tenNV;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCB;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLam;
}

// cập nhật
function capNhatNV() {
    var nv = layDuLieu();
    if (nv != 0) {
        dsnv.capNhatNV(nv);
        // lưu xuống local
        setLocalStorage();
        // hiển thị lên table
        hienThiTable(dsnv.mangNV);
    }
}
// reset
function reserForm() {
    getELE("formQLNV").reset();
    getELE("tknv").disabled = false;
}

// tìm kiếm
function timKiemTheoXepLoai() {
    var tuKhoaTK = getELE("searchName").value;
    var mangKQ = dsnv.timKiem(tuKhoaTK);
    hienThiTable(mangKQ);
}
getELE("btnTimNV").addEventListener("click", timKiemTheoXepLoai);
// getELE("searchName").addEventListener("keyup",timKiemTheoXepLoai);