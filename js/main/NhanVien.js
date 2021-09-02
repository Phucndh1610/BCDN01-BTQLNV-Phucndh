function NhanVien(taikhoan,ten,email,mk,ngaylam,luong,chucvu,giolam){
    //thuộc tính
    //this là đại diện cho lớp đối tượng => this là NhanVien
    //this giúp truy xuất thuộc tính của lớp đối tượng
    this.taiKhoan = taikhoan;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = mk;
    this.ngayLam = ngaylam;
    this.luongCB = luong;
    this.chucVu = chucvu;
    this.gioLam = giolam;
    this.luongTB = 0;
    this.xepLoai = "";



    //Phương thức
    //Camel case:
    this.tinhLuong = function(loai){
        if(this.chucVu == "Sếp"){
            return (this.luongCB * 3);
        }else if(this.chucVu == "Trưởng phòng"){
            return (this.luongCB * 2);
        }else if(this.chucVu == "Nhân viên"){
            return (this.luongCB);
        }else {
            return 0;
        }
    }

    this.xepLoai = function(){
        if(this.gioLam >= 0 && this.gioLam < 160){
            return "Trung Bình";
        }else if (this.gioLam >= 160 && this.gioLam < 176){
            return "Khá";
        }else if(this.gioLam >= 176 && this.gioLam < 192){
            return "Giỏi";
        }else{
            return "Xuất sắc";
        }
    }
}