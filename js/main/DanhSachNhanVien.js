function DanhSachNhanVien(){

    //thuộc tính
    //this là đại diện cho DanhSachNhanVien
    this.mangNV = [];

    //Phương thức
    this.themNhanVien = function (nv) {
        this.mangNV.push(nv);
    }
     /**
     * cho viTri = -1
     * Nếu tìm được sv thì gán index tìm được vào viTri
     * Ngược lại thì tra kq viTri=-1 (không thay đổi giá trị của viTri)
     */
      this.timViTri = function (ma) {
        var viTri = -1;
        this.mangNV.map(function (item, index) {
            // item chính là 1 sv trong mảng            
            if (item.taiKhoan == ma) {
                viTri = index;
            }
        });

        return viTri;
    }
    // xóa nhân viên
    this.xoaNhanVien = function (taiKhoan) {

        var viTri = this.timViTri(taiKhoan);
        if (viTri >= 0) {
            //tìm được
            //splice(viTri,1): viTri=> vị trí bắt đầu của phần tử cần xóa,; 1=> số lương phần tử cần xóa từ vị trí
            this.mangNV.splice(viTri, 1);
        } else {
            console.log("Không tìm được");
        }
    }
    // Cập nhật sinh viên
    this.capNhatNhanVien = function(nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri >= 0) {
            this.mangNV[viTri] = nv;
        } else {
            console.log("Không tìm được");
        }
    }


}

// tìm kiếm
// prototy (object):thêm thuộc tính, phương thức cho lớp đối tượng mà không cần thêm trực tiếp trong lớp đối tượng
/**
 * Tìm kiếm:
 * tuKhoaTK
 * tên nv lấy từ MangNV
 * tuKhoaTK == tenNV
 * indexOf: nếu trong string còn tồn tại từ khóa đang tìm kiếm thì trả về vị trí của từ khóa trong chuỗi string. nếu trả về -1 là không tìm thấy
 */
DanhSachNhanVien.prototype.timKiem = function(tuKhoaTK){
    var mangKQ = [];
    // chuyển tukhoaTK sang chữ thường
    var lowerCK = tuKhoaTK.trim().toLowerCase();
    this.mangNV.map(function(item,index){
        // chuyển tên NV sang chử thường
        var tenThuong = item.xepLoai.toLowerCase();
        var kq = tenThuong.indexOf(lowerCK);
        if(kq >= 0){
            mangKQ.push(item);
        }
    });
    return mangKQ;
}
 